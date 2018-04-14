let sliderButtons = {

    create ({sliderElem, activeClass, pointerElem, canvasElem, baseSlider, buttonsElem}) {
        this.elem = sliderElem;
        this.children = this.elem.children;
        this.baseSlider = baseSlider;
        this.coordinatesButtons = [];
        this.activeClass = activeClass;
        this.pointer = pointerElem;
        this.canvas = canvasElem;
        this.duration = this.baseSlider.interval;
        this.animationId = 0;
        this.state = this.baseSlider.state.current;
        this.buttonsElem = buttonsElem;

        this.getCoordinatesButtons();
        this.initCanvas ();
        this.init();

        window.addEventListener('load', () => {
            setTimeout(() => {
                this.playCanvas();
            }, 600)
        });

    },

    initCanvas () {
        this.canvas.width = parseInt(getComputedStyle(this.canvas).width.slice(0, -2), 10);
        this.canvas.height = parseInt(getComputedStyle(this.canvas).height.slice(0, -2), 10);
        this.canvasContext = this.canvas.getContext('2d');

    },

    playCanvas () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvasContext.strokeStyle = '#ffffff';
        this.canvasContext.lineWidth = 2;
        let steps = this.duration / 4.8;

        this.draw(steps, this.canvasContext);

    },

    draw (steps, context) {
        let i;
        let properRotation = 0;
        let x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        let radius = 14;
        let angleStart;
        let angleFinish;
        let additionalAngle = 0;

        cancelAnimationFrame(this.animationId);
        let drawArc = () => {
            i = this.baseSlider.iteration;
            additionalAngle = this.funcForCircle.func1(steps, properRotation);
            angleStart = this.funcForCircle.func2(steps, i, additionalAngle);
            angleFinish = this.funcForCircle.func3(steps, i, additionalAngle);

            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.beginPath();

            context.arc(x, y, radius, angleStart, angleFinish);
            context.stroke();
            ++properRotation;
            this.animationId = requestAnimationFrame(drawArc);
        };

        this.animationId = requestAnimationFrame(drawArc);

    },

    funcForCircle: {
        func1: (steps, i, additionalValue = 0) => (Math.PI / 180) * (360 / steps * i * 2) + additionalValue,
        func2: (steps, i, additionalValue = 0) => (Math.PI / 180) * (360 / steps * i * 2.5) + additionalValue,
        func3: (steps, i, additionalValue = 0) => (Math.PI / 180) * (360 / steps * i * 2.5) + (Math.PI / 180)*(360 / steps * Math.pow(i, 2 / 30) * ((1.5 + 1) * i - 1.5)) + additionalValue,
    },

    getCoordinatesButtons () {
        let result = [];

        for (let i = 0; i < this.buttonsElem.length; ++i) {
            result.push({x: this.buttonsElem[i].offsetLeft, y: this.buttonsElem[i].offsetTop});
        }

        this.coordinatesButtons = result;
    },

    addActiveClass(i) {
        this.children[i].classList.add(this.activeClass);
    },

    removeActiveClass(i) {
        this.children[i].classList.remove(this.activeClass);
    },

    moveIndicators () {
        let x = this.coordinatesButtons[this.state].x;
        let y = this.coordinatesButtons[this.state].y;
        this.pointer.style.transform = `translate(${x}px, ${y}px)`;
        this.canvas.style.transform = `translate(${x}px, ${y}px)`;
    },

    changeChildren(state) {
        let i = this.children.length;
        while ( i-- ) {
            state === i ? this.addActiveClass(i) : this.removeActiveClass(i);
        }
        this.state = state;
        this.moveIndicators ();
    },

    onResizeWindow () {
        this.getCoordinatesButtons();
        this.moveIndicators ();
    },

    onClickForButtons (i) {
        this.baseSlider.setState(i);
    },

    init () {
        for (let i = 0 ; i < this.children.length; ++i ) {
            this.children[i].addEventListener('click', () => {this.onClickForButtons(i)})
        }
        this.changeChildren(this.state);
        window.addEventListener('resize', this.onResizeWindow.bind(this));
    },
};
