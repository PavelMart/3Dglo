const menuToggle = () => {

    const menu = document.querySelector('menu'),
        menuItems = document.querySelectorAll('li');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.body.addEventListener( 'click', ( event ) => {
        let target = event.target;

        if ( target.classList.contains('close-btn') ) {
            handlerMenu();
        }

        menuItems.forEach( item => {
            const targetParent = target.parentNode;
            if ( item === targetParent ) {
                handlerMenu();
            }

        });

        target = target.closest('.menu');

        if (target) {
            handlerMenu();
        } else {
            menu.classList.remove('active-menu');
        }
    });

};

export default menuToggle;