/*
* Слайдер имеет свое внутренее состояние, которое равно текущему слайду.
*
* Данное состояние можно получить с помощью: BigSlider.state.current
*
* Можно установить нужное состояние (нужный номер слайда) с помощью: BigSlider.setState(newState)
*
* Можно перелистывать слайдер с помощью методов: BigSlider.next() BigSlider.back()
*
* Слайдер имеет внутреннюю анимацию, которая обнуляется при каждом перелистывании.
*
* Получить значение текущей анимации можно с помощью: BigSlider.iteration
*
* С помощью метода BigSlider.setFuncOnLoop(Массив функций или функция) можно добавлять функции,
* которые будут выполняться при перелистывании слайдера
*
* Параметр arrayOfRelatedItemsArrayOfHTMLElement принимает контейнеры элементов слайдера, например контейнер картинок слайдера, контейнер кнопок слайдера.
* По данному параметру вычисляется количество слайдов в слайдере (максимальное состояние)
*
* Параметр itemsForStopPlayOnHoverArrayOfHTMLElementOrHTMLElement - это те элементы, при навереднии на которые слайдер будеи приостанавливаться
*
* Параметр startStateNumber - это начальное значение слайдера
*
* Параметр intervalNumberOrBoolean - это интервал слайдера, если поставить false - слайдер не будер перелистываться, а внутренняя анимация не запустится
*
* Параметр isReverse - если true, но будет в обратном направлении
*/

class BigSlider {
    constructor (arrayOfRelatedItemsArrayOfHTMLElement, itemsForStopPlayOnHoverArrayOfHTMLElementOrHTMLElement, startStateNumber, intervalNumberOrBoolean, isReverse = false) {

        this.relatedItems = arrayOfRelatedItemsArrayOfHTMLElement;

        this.isReverse = isReverse;

        this.state = {};
        this.state.max = this.getMaxState();
        this.state.current = parseInt(this.checkInputState(startStateNumber), 10) || 0;

        this.iteration = 0;
        this.animationId = 0;

        this.itemsForStopPlayOnHover = itemsForStopPlayOnHoverArrayOfHTMLElementOrHTMLElement;

        let isNumberInterval = typeof intervalNumberOrBoolean === 'number' ? intervalNumberOrBoolean : 3000;
        this.interval = intervalNumberOrBoolean === false ? intervalNumberOrBoolean : isNumberInterval;
        this.newInterval = this.interval;

        this.time = {
            start: 0,
            left: this.interval,
        };

        this.setEventHandlers();
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.play();
            }, 600)
        });

    }

    checkInputState (inputState) {
        return !inputState || inputState > this.state.max || inputState < 0 ? 0 : inputState;
    }

    setState(newState) {
        this.state.current = this.checkInputState(newState);
        this.additionalFuncOnPlay(this.state.current);
        this.play();
    }

    setEventHandlers() {

        let addStopPlayHandler = (elem) => {
            if (elem) {
                if (elem.length) {
                    for (let i = 0; i < elem.length; ++i) {
                        elem[i].addEventListener('mouseover', this.pause.bind(this));
                        elem[i].addEventListener('mouseout', this.play.bind(this));
                    }
                } else {
                    elem.addEventListener('mouseover', this.pause.bind(this));
                    elem.addEventListener('mouseout', this.play.bind(this));
                }
            }
        };

        if (Array.isArray(this.itemsForStopPlayOnHover)) {
            this.itemsForStopPlayOnHover.forEach(item => {
                addStopPlayHandler(item);
            })
        } else {
            addStopPlayHandler(this.itemsForStopPlayOnHover);
        }
    }

    getMaxState() {
        if (Array.isArray(this.relatedItems)) {

            let max = Infinity;
            this.relatedItems.forEach(elem => {

                if (elem instanceof HTMLElement) {
                    max = elem.children.length < max ? elem.children.length : max;
                }

            });
            return max - 1;

        } else if (this.relatedItems instanceof HTMLElement) {

            return this.relatedItems.children.length - 1
        }
    }

    incrementState() {
        this.state.current = this.state.current < this.state.max ? ++this.state.current : 0;
    }

    decrementState() {
        this.state.current = this.state.current ? --this.state.current : this.state.max;
    }

    next() {
        this.incrementState();
        this.additionalFuncOnPlay(this.state.current);
    }

    back() {
        this.decrementState();
        this.additionalFuncOnPlay(this.state.current);
    }

    additionalFuncOnPlay () {/*Здесь будут новые функции, если они будут переданы*/}

    setFuncOnLoop (arrayFuncOrFunc) {

        let checkOnFunction = (func, param) => {
            if (typeof func === 'function') {
                func(param);
            }
        };

        this.additionalFuncOnPlay = (state) => {

            this.toResetAnimation();

            if (Array.isArray(arrayFuncOrFunc)) {
                arrayFuncOrFunc.forEach(func => {
                    checkOnFunction(func, state);
                })
            }

            checkOnFunction(arrayFuncOrFunc, state);

        }
    }

    toResetAnimation() {
        this.iteration = 0;
    }

    setAnimation () {
        this.animationId = requestAnimationFrame(this.playAnimation.bind(this));
    }

    playAnimation () {
        ++this.iteration;
        this.animationId = requestAnimationFrame(this.playAnimation.bind(this))
    }

    setNewInterval () {
        this.time.left -= Date.now() - this.time.start;
        this.newInterval = this.time.left > this.interval || this.time.left < 0 ? this.interval : this.time.left;
    }

    checkInterval () {
        if (this.newInterval < this.interval && this.newInterval > 0) {
            this.newInterval = this.interval;
            this.loop(this.interval);
        }
    }

    setTimeParams () {
        this.time.left = this.interval;
        this.time.start = Date.now();
    }

    loop (interval) {
        this.time.start = Date.now();

        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {

            this.isReverse ? this.back() : this.next();

            this.setTimeParams ();
            this.toResetAnimation();
            this.checkInterval();

        }, interval);
    }

    play() {

        if (this.interval) {
            this.stopAnimation ();
            this.setAnimation ();
            this.loop(this.newInterval);
        }
    }

    stopAnimation () {
        cancelAnimationFrame(this.animationId);
    }

    pause() {
        this.setNewInterval ();
        clearInterval(this.intervalId);
        this.stopAnimation ();
    };

}