(function () {
    let mainScreenHome = document.getElementsByClassName('main-screen-home')[0];

    if (mainScreenHome) {

        let duration = 7000;

        let sliderElem = document.querySelector('.main-screen-home__slider .slider-buttons__list');
        let sliderImagesElem = document.getElementsByClassName('main-screen-home__images-slider')[0];
        let sliderTextElem = document.getElementsByClassName('main-screen-home__slider-text')[0];

        let pointerElem = document.querySelector('.main-screen-home__slider .slider-buttons__pointer');
        let buttonsElem = sliderElem.getElementsByClassName('slider-buttons__item');
        let canvasElem = document.querySelector('.main-screen-home__slider .slider-buttons__canvas');

        let arrayOfRelatedItems = [
            sliderTextElem,
            sliderImagesElem,
            sliderElem,
        ];

        let arrayItemStopPlayOnHover = document.getElementsByClassName('main-screen-home__slider-text')[0];

        let baseSlider = new BigSlider(arrayOfRelatedItems, arrayItemStopPlayOnHover, '', duration);

        sliderButtons.create({
            sliderElem,
            activeClass: 'slider-buttons__item_current',
            pointerElem,
            canvasElem,
            baseSlider,
            buttonsElem,
        });

        sliderImages.create({
            sliderImagesElem,
            baseSlider,
            rightClass: 'main-screen-home__images-wrapper_rightward',
            leftClass: 'main-screen-home__images-wrapper_leftward',
        });

        sliderText.create({sliderTextElem, baseSlider});

        let additionalFuncForSlider = [
            sliderButtons.changeChildren.bind(sliderButtons),
            sliderButtons.playCanvas.bind(sliderButtons),
            sliderImages.changeChildren.bind(sliderImages),
            sliderText.changeChildren.bind(sliderText),
        ];

        baseSlider.setFuncOnLoop(additionalFuncForSlider);

    }
}());