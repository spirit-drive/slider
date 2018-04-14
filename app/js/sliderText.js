let sliderText = {

    create ({sliderTextElem, startState}) {
        this.elem = sliderTextElem;
        this.children = this.elem.children;
        this.toActionForAll(startState);

    },

    show(elem) {
        myLib.fadeIn(elem);
    },

    hide(elem) {
        myLib.fadeOut(elem);
    },

    toActionForAll (state) {
        let i = this.children.length;
        while ( i-- ) {
            state === i ? this.show(this.children[i]) : this.hide(this.children[i]);
        }
    },

    changeChildren(state) {

        this.toActionForAll(state);

    },
};
