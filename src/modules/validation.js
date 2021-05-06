// Validation
const validation = () => {
    // FormValidation
    const formValidation = () => {
        const formElems = document.querySelectorAll('form');
        const inputElems = document.querySelectorAll('form input');
        const regularNameText = /[а-яёА-ЯЁ\s]/;
        const regularEmail = /[a-zA-Z\-\@\_\.\!\~\*\']/;
        const regularText = /[а-яёА-ЯЁ\s\d\.,\!\?]/;
        const regularInvertNameText = /[^а-яёА-ЯЁ\s]/g;
        const regularInvertEmail = /[^a-zA-Z\-\@\_\.\!\~\*\']/g;
        const regularInvertText = /[^а-яёА-ЯЁ\s\d\.,\!\?]/g;

        formElems.forEach( item => {

            item.addEventListener('keypress', event => {
                const key = event.key;
                const target = event.target;			

                if (target.tagName === 'INPUT' && (target.name === 'user_name')) {
                    if (!key.match(regularNameText)) {
                        event.preventDefault();
                    }
                } 

                if (target.tagName === 'INPUT' && target.name === 'user_email') {
                    if (!key.match(regularEmail)) {
                        event.preventDefault();
                    }
                } 

                if (target.tagName === 'INPUT' && target.name === 'user_message') {
                    if (!key.match(regularText)) {
                        event.preventDefault();
                    }
                } 

            }); 
            
        });
        
        inputElems.forEach( item => {
            item.addEventListener('blur', event => {

                const target = event.target;

                if ( target.name === 'user_name') {

                    target.value = target.value.replace(regularInvertNameText, '');

                }

                if (target.name === 'user_email') {
                    
                    target.value = target.value.replace(regularInvertEmail, '');	

                } 

                if (target.name === 'user_message') {
                    
                    target.value = target.value.replace(regularInvertText, '');

                } 
                
                

            });
        });

    };

    // PhoneValidation
    const phoneValidation = () => {
        const inputPhoneElems = document.querySelectorAll('[name = "user_phone"]');

        const showSuccess = (elem) => {
            elem.style.backgroundColor = '';
        };
        
        const showError = (elem) => {
            elem.style.backgroundColor = '#FF8B73';
        };

        const isValid = (value, regular) => {
            return regular.test(value);
        };

        const checkInput = (elem) => {
            const inputValue = elem.value,
                regularPhone = /^\+?[78]([-()]*\d){10}$/;

            if (isValid(inputValue, regularPhone)) {
                showSuccess(elem);
                return true;
            } else {
                showError(elem);
                return false;
            }

        };

        inputPhoneElems.forEach( elem => {
            elem.addEventListener('change', event => {
                const target = event.target;

                target.dataset.flag = checkInput(target);
            });
        });

    };

    formValidation();
    phoneValidation();
};

export default validation;