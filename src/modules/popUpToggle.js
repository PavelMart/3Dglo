const popUpToggle = () => {
    const popupBtnElems = document.querySelectorAll('.popup-btn'),
        popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content');

    popupBtnElems.forEach(elem => {
        elem.addEventListener('click', () => {
            

            if (document.documentElement.offsetWidth <= 768) {

                popup.style.display = 'block';

            } else {

                popup.style.display = 'block';
                popup.style.opacity = 0;
                popupContent.style.opacity = 0;

                let count = 0;

                const timer = setInterval(() => {

                    count += 0.1;

                    if (count <= 1) {

                        popup.style.opacity = `${count}`;
                        popupContent.style.opacity = `${count}`;

                    } else {

                        popup.style.opacity = `1`;
                        popupContent.style.opacity = `1`;
                        clearInterval(timer);
                        return;

                    }

                }, 20);

            }

        });
    });

    popup.addEventListener( 'click', (event) => {
        let target = event.target;

        if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
        }

        target = target.closest('.popup-content');

        if (!target) {
            popup.style.display = 'none';
        }
    });

};

export default popUpToggle;