let sliderText = {

    create ({sliderTextElem, baseSlider}) {
        this.elem = sliderTextElem;
        this.children = this.elem.children;
        this.timeOut = 0;
        this.toActionForAll(baseSlider.state.current,  0, 0);

    },

    show(i) {
        myLib.fadeIn(this.children[i]);
    },

    hide(i) {
        myLib.fadeOut(this.children[i]);
    },

    toActionForAll (state, timeOutShow, timeOutHide) {
        let i = this.children.length;
        while ( i-- ) {
            state === i ? this.show(i, timeOutShow) : this.hide(i, timeOutHide);
        }
    },

    changeChildren(state) {

        this.toActionForAll(state);

    },
};
