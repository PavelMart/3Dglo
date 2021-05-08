// Validation
const validation = () => {
    // FormValidation
    const formValidation = () => {
        const formElems = document.querySelectorAll('form');
        const inputElems = document.querySelectorAll('form input');

        const regularNameText = /[а-яёА-ЯЁ\s]/;
        const regularEmail = /[a-zA-Z\-\@\_\d\.]/;
        const regularText = /[а-яёА-ЯЁ\s\d\.,\!\?]/;
        const regularPhone = /[\+\d()]/;
        const regularInvertNameText = /[^а-яёА-ЯЁ\s]/g;
        const regularInvertEmail = /[^a-zA-Z\-\@\_\d\.]/g;
        const regularInvertPhone = /[^\+\d()]/g;
        const regularInvertText = /[^а-яёА-ЯЁ\s\d\.,\!\?]/g;

        const tabooInput = (event, name, regExp) => {
            const key = event.key;
            const target = event.target;

            if (target.tagName === 'INPUT' && (target.name === name)) {
                if (!key.match(regExp)) {
                    event.preventDefault();
                }
            } 
        };

        const removeNotAllowed = (event, name, regExp) => {
            const target = event.target;

            if ( target.name === name) {
                target.value = target.value.replace(regExp, '');
            }

            if (name === 'user_name') {
                const firstLetter = target.value.match(regularNameText)[0].toUpperCase();
                target.value = target.value.replace(regularNameText, firstLetter);
                target.value = target.value.replace(/\s{2,}/g, ' ');
            } else {
                return;
            }
        };

        formElems.forEach( item => {
            item.addEventListener('keypress', event => {
                const target = event.target;

                switch (target.name) {
                    case 'user_name':
                        tabooInput(event, 'user_name', regularNameText);
                        break;
                    case 'user_email':
                        tabooInput(event, 'user_email', regularEmail);
                        break;
                    case 'user_phone':
                        tabooInput(event, 'user_phone', regularPhone);
                        break;
                    case 'user_message':
                        tabooInput(event, 'user_message', regularText);
                        break;
                } 
            }); 
        });
        
        inputElems.forEach( item => {
            item.addEventListener('blur', event => {
                const target = event.target;

                switch (target.name) {
                    case 'user_name':
                        if (target.value) {
                            removeNotAllowed(event, 'user_name', regularInvertNameText);
                        }
                        break;
                    case 'user_email':
                        if (target.value) {
                            removeNotAllowed(event, 'user_email', regularInvertEmail);
                        }
                        break;
                    case 'user_phone':
                        if (target.value) {
                            removeNotAllowed(event, 'user_phone', regularInvertPhone);
                        }
                        break;
                    case 'user_message':
                        if (target.value) {
                            removeNotAllowed(event, 'user_message', regularInvertText);
                        }
                        break;
                }
                
            });
        });

    };

    //PhoneValidation
    const textEmailValidation = () => {
        const inputTextElems = document.querySelectorAll('[name = "user_name"]');
        const inputEmailElems = document.querySelectorAll('[name = "user_email"]');
        const regularName = /\D{2,}/g;
        const regularEmail = /\@/g;



        const showSuccess = (elem) => {
            elem.style.backgroundColor = '';
        };
        
        const showError = (elem) => {
            elem.style.backgroundColor = '#FF8B73';
        };

        const isValid = (value, regular) => {
            return regular.test(value);
        };

        const checkInput = (elem, regular) => {
            const inputValue = elem.value;

            if (isValid(inputValue, regular)) {
                showSuccess(elem);
                return true;
            } else {
                showError(elem);
                return false;
            }

        };

        inputTextElems.forEach( elem => {
            elem.addEventListener('change', event => {
                const target = event.target;

                target.dataset.flag = checkInput(target, regularName);
            });
        });

        inputEmailElems.forEach( elem => {
            elem.addEventListener('change', event => {
                const target = event.target;

                target.dataset.flag = checkInput(target, regularEmail);
            });
        });

    };

    formValidation();
    textEmailValidation();
};

export default validation;