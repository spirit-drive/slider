(function () {
    let mainScreenHome = document.getElementsByClassName('main-screen-home')[0];

    if (mainScreenHome) {

        let sliderButtonsElem = document.querySelector('.main-screen-home__slider .slider-buttons__list');
        let sliderImagesElem = document.getElementsByClassName('main-screen-home__images-slider')[0];

        let arrayOfRelatedItems = [
            sliderImagesElem,
            sliderButtonsElem,
        ];

        let arrayItemForStopPlayOnHover = document.getElementsByClassName('main-screen-home__bait')[0];

        let startState = 0;
        // let interval = false;
        let interval = 3000;
        let isReverse = false;

        let baseSlider = new BigSlider(arrayOfRelatedItems, arrayItemForStopPlayOnHover, startState, interval, isReverse);

        let pointerElem = document.querySelector('.main-screen-home__slider .slider-buttons__pointer');
        let buttonsElem = sliderButtonsElem.getElementsByClassName('slider-buttons__item');
        let canvasElem = document.querySelector('.main-screen-home__slider .slider-buttons__canvas');
        let canvasParam = {
            strokeStyle: '#ffffff',
            lineWidth: 2,
            radius: 14,
        };

        sliderButtons.create({
            sliderButtonsElem,
            activeClass: 'slider-buttons__item_current',
            pointerElem,
            canvasElem,
            baseSlider,
            buttonsElem,
            canvasParam,
        });

        sliderImages.create({
            sliderImagesElem,
            baseSlider,
            duration: 1000,
        });

        let additionalFuncForSlider = [
            sliderButtons.changeChildren.bind(sliderButtons),
            sliderButtons.playCanvas.bind(sliderButtons),
            sliderImages.changeChildren.bind(sliderImages),
        ];

        baseSlider.setFuncOnLoop(additionalFuncForSlider);

    }
}());