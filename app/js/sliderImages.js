let sliderImages = {
    create ({sliderImagesElem, baseSlider, duration = 3000}) {
        this.elem = sliderImagesElem;
        this.children = this.elem.children;
        this.widthScroll = myLib.getScrollWidth();
        this.state = baseSlider.state.current;
        this.zIndex = 0;
        this.duration = duration;
        this.animationId = 0;

        this.init ();
    },

    loop (elem, width, stepWidth) {
        let i = 0;
        let resultWidth;
        let animationId;

        let loop = () => {
            resultWidth = Math.pow(stepWidth * i / 4, 1.2);

            if (resultWidth >= width) {
                elem.style.width = '100%';
                cancelAnimationFrame(animationId);
            } else {
                elem.style.width = `${resultWidth}px`;
                animationId = requestAnimationFrame(loop);
            }
            ++i;

        };
        animationId = requestAnimationFrame(loop);


    },

    toTurnSlide (state, elem) {

        // this.setVector (state, elem);
        //
        // elem.style.zIndex = ++this.zIndex;
        // let steps = this.duration / 20;
        // let width = window.innerWidth - this.widthScroll;
        // let stepWidth = width / steps;
        //
        // this.loop(elem, width, stepWidth);

        this.setVector (state, elem);

        let duration = this.duration / 1000;

        elem.style.transition = 'none';
        elem.style.width = 0;
        elem.style.zIndex = ++this.zIndex;


        setTimeout(() => {
            elem.style.transition = `width ${duration}s cubic-bezier(0.47, 0, 0.745, 0.715)`;
            elem.style.width = '100%';
        }, 50);


    },

    setStyleForMove (elem, isLeft) {
        let vector = isLeft ? ['left', 'right'] : ['right', 'left'];
        vector.forEach((prop, i) => {
            elem.style[prop] = i ? 'auto' : 0;
            elem.children[0].style[prop] = i ? 'auto' : 0;
        })
    },

    setLeft(elem) {
        this.setStyleForMove(elem, true);
    },

    setRight(elem) {
        this.setStyleForMove(elem);
    },

    setVector (state, elem) {
        this.state < state ? this.setLeft (elem) : this.setRight (elem);
    },

    setWidthForImages () {
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
        this.setWidthForImages ();
        this.resetZIndex (this.state);
        window.addEventListener('resize', this.setWidthForImages.bind(this))
    }

};
