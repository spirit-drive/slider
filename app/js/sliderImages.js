let sliderImages = {
    create ({sliderImagesElem, baseSlider, rightClass, leftClass}) {
        this.elem = sliderImagesElem;
        this.children = this.elem.children;
        this.widthScroll = myLib.getScrollWidth();
        this.state = baseSlider.state.current;
        this.zIndex = 0;
        this.rightClass = rightClass;
        this.leftClass = leftClass;

        this.init ();
    },

    loop (elem, width, stepWidth) {
        let i = 0;
        let resultWidth;

        let loop = () => {
            resultWidth = Math.pow(stepWidth * i / 30, 1.2);
            // resultWidth = Math.pow(stepWidth * i / 4.4, 1.2);

            if (resultWidth >= width) {
                elem.style.width = '100%';
            } else {
                elem.style.width = `${resultWidth}px`;
                requestAnimationFrame(loop);
            }
            ++i;

        };
        requestAnimationFrame(loop);

    },

    toTurnSlide (state, elem) {

        this.setVector (state, elem);

        elem.style.zIndex = ++this.zIndex;
        let duration = 300;
        let steps = duration / 20;
        let width = window.innerWidth - this.widthScroll;
        let stepWidth = width / steps;

        this.loop(elem, width, stepWidth)

    },

    setLeft(elem) {
        elem.classList.add(this.leftClass);
        elem.classList.remove(this.rightClass);
    },

    setRight(elem) {
        elem.classList.add(this.rightClass);
        elem.classList.remove(this.leftClass);
    },

    setVector (state, elem) {
        this.state < state ? this.setLeft (elem) : this.setRight (elem);
    },

    setWidthForImage () {
        let scrollWidth = window.innerHeight < window.scrollHeight ? this.widthScroll : 0;
        let width = window.innerWidth - scrollWidth;

        let i = this.children.length;
        while ( i-- ) {
            this.children[i].children[0].style.width = `${width}px`;
        }
    },

    changeChildren (state) {

        if (state !== this.state) {

            let i = this.children.length;
            while ( i-- ) {
                i === state && this.toTurnSlide (state, this.children[i]);
            }

            this.state = state;
        }

    },

    resetZIndex (state) {
        let i = this.children.length;
        while ( i-- ) {
            i === state ? this.children[i].style.zIndex = this.zIndex + 1 : this.children[i].style.zIndex = this.zIndex;
        }
    },

    init () {
        this.setWidthForImage ();
        this.resetZIndex (this.state);
        window.addEventListener('resize', this.setWidthForImage.bind(this))
    }

};
