const slider = () => {

    const slider = document.querySelector('.portfolio-content'),
        slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots');

    for (let i = 0; i < slide.length; i++) {

        const dotElement = document.createElement('li');
        dotElement.classList.add('dot');
        
        if (i === 0) {
            dotElement.classList.add('dot-active');
        }

        portfolioDots.append(dotElement);

    }

    const dot = document.querySelectorAll('.dot');

    let interval;

    let currentSlide = 0;

    const prev = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const next = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prev(slide, currentSlide, 'portfolio-item-active');
        prev(dot, currentSlide, 'dot-active');

        currentSlide++;
        
        if (currentSlide >= slide.length) {
            currentSlide = 0;
        }

        next(slide, currentSlide, 'portfolio-item-active');
        next(dot, currentSlide, 'dot-active');

    };

    const startSlider = () => {
        interval = setInterval(autoPlaySlide, 2000);
    };

    const stopSlider = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();
        const target = event.target;

        if (!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prev(slide, currentSlide, 'portfolio-item-active');
        prev(dot, currentSlide, 'dot-active');

        if (target.matches('#arrow-left')) {

            currentSlide--;

        } else if (target.matches('#arrow-right')) {

            currentSlide++;

        }  

        if (currentSlide < 0) {
            currentSlide = slide.length - 1;
        } else if (currentSlide >= slide.length) {
            currentSlide = 0;
        }
        
        if (target.matches('.dot')) {
            dot.forEach( (item, i) => {
                if (target === item) {
                    currentSlide = i;
                    return;
                }
            });
        }

        next(slide, currentSlide, 'portfolio-item-active');
        next(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
        if (event.target.matches('.portfolio-btn, .dot')) {
            stopSlider();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if (event.target.matches('.portfolio-btn, .dot')) {
            startSlider();
        }
    });

    startSlider();

};

export default slider;