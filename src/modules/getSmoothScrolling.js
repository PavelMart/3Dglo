const getSmoothScrolling = () => {
		
    const menuList = document.querySelector('menu > ul');
    const linkToFirstSlide = document.querySelector('main a');

    const getScroll = ( e ) => {

        e.preventDefault();
        const link = e.target.href;
        const id = link.substr(23);

        const slide = document.querySelector(`${id}`);
        const slidePosition = slide.offsetTop;

        const scrolling = setInterval(() => {

            if (document.documentElement.scrollTop < slidePosition) {

                scrollBy(0, 20);
                
            } else {

                clearInterval(scrolling);

            }

        }, 1);

    };

    linkToFirstSlide.addEventListener( 'click', getScroll );
    menuList.addEventListener( 'click', getScroll );

};

export default getSmoothScrolling;