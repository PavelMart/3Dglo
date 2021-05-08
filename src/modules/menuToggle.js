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

        if (target.closest('.menu')) {
            handlerMenu();
        }

        menuItems.forEach( item => {
            const targetParent = target.parentNode;
            if ( item === targetParent ) {
                handlerMenu();
            }

        });

        const menuList = target.closest('menu');
        const menuBurger = target.closest('.menu');

        if (!menuList && !menuBurger) {
            menu.classList.remove('active-menu');
        } 
            
    
    });

};

export default menuToggle;