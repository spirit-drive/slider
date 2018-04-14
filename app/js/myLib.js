let myLib = {

    setClickHandler(elem, handler) {

        if (elem.length){
            for (let i = 0; i < elem.length; ++i) {
                elem[i].addEventListener('click', handler)
            }
        } else {
            elem.addEventListener('click', handler)
        }

    },

    getScrollWidth() {
        let div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollWidth;
    },

    fadeOut(elem, duration = 300) {

        if (getComputedStyle(elem).display !== 'none') {

            let i = 0;

            let fadeOutEntrails = () => {
                ++i;
                let stepOpacity = 1 / duration * 20;
                let attenuation = duration - i * 20;

                elem.style.opacity = 1 - stepOpacity * i;

                if (attenuation > 0) {
                    requestAnimationFrame(fadeOutEntrails);
                } else {
                    elem.style.display  = 'none';
                }
            };
            requestAnimationFrame(fadeOutEntrails);
        }

    },

    fadeIn(elem, duration = 300) {


        if (getComputedStyle(elem).display === 'none') {

            let i = 0;

            elem.style.opacity = 0;
            elem.style.display = 'block';

            let fadeInEntrails = () => {
                ++i;
                let stepOpacity = 1 / duration * 20;
                let attenuation = duration - i * 20;

                elem.style.opacity = stepOpacity * i;

                if (attenuation > 0) {
                    requestAnimationFrame(fadeInEntrails);
                }
            };
            requestAnimationFrame(fadeInEntrails);

        }

    }
};