class BigSlider {
    constructor (arrayOfRelatedItemsArrayOfHTMLElement, itemsForStopPlayOnHoverArrayOfHTMLElementOrHTMLElement, startStateNumber = 0, intervalNumberOrBoolean, isReverse = false) {

        this.relatedItems = arrayOfRelatedItemsArrayOfHTMLElement;
        this.isReverse = typeof isReverse === 'boolean' ? isReverse : false;

        this.state = {};
        this.state.max = this.getMaxState();
        this.state.current = this.checkInputState(startStateNumber);

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

    setState(valueNumber) {
        this.state.current = this.checkInputState(valueNumber);
        this.additionalFuncOnPlay(this.state.current);
        this.play();
    }

    setEventHandlers() {

        let addStopPlayHandler = (elem) => {
            elem.addEventListener('mouseover', this.stop.bind(this));
            elem.addEventListener('mouseout', this.play.bind(this));
        };

        if (Array.isArray(this.itemsForStopPlayOnHover)) {
            this.itemsForStopPlayOnHover.forEach(item => {
                addStopPlayHandler(item);
            })
        } else if (this.itemsForStopPlayOnHover instanceof HTMLElement) {
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

    playAnimation () {
        ++this.iteration;
        this.animationId = requestAnimationFrame(this.playAnimation.bind(this))
    }

    toResetAnimation() {
        this.iteration = 0;
    }

    setAnimation () {
        this.animationId = requestAnimationFrame(this.playAnimation.bind(this));
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

    stop() {
        this.setNewInterval ();
        clearInterval(this.intervalId);
        this.stopAnimation ();
    };

}