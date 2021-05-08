const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы с Вами скоро свяжемся!';
    
    const form1 = document.getElementById('form1'),
        form2 = document.getElementById('form2'),
        form3 = document.getElementById('form3');

    const statusMessage = document.createElement('div');
    statusMessage.style.color = 'white';

    const postData = (data) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
    };

    const clearInput = (form) => {
        const inputElems = form.querySelectorAll('input'),
            textAreaElem = form.querySelector('text-area');

        inputElems.forEach( elem => {
            elem.value = '';
        });

        if (textAreaElem) {
            textAreaElem.value = '';
        }
    };

    const submitListener = (form) => {
        form.addEventListener('submit', event => {
            event.preventDefault();

            const inputName = form.querySelector('[name = "user_name"]');
            const inputEmail = form.querySelector('[name = "user_email"]');

            if (inputName.dataset.flag === 'false' || inputEmail.dataset.flag === 'false') {
                return;
            }

            form.append(statusMessage);

            statusMessage.textContent = loadMessage;

            const formData = new FormData(form),
                formJSON = {};

            formData.forEach( (item, key) => {
                formJSON[key] = item;
            });

            postData(formJSON)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                })
                .then(() => {
                    const popup = document.querySelector('.popup');
                    setTimeout(() => {
                        if (popup.style.display !== 'none') {
                            popup.style.display = 'none';
                        }

                        statusMessage.textContent = '';
                    }, 3000);
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });

            clearInput(form);

        });
    };

    submitListener(form1);
    submitListener(form2);
    submitListener(form3);

};

export default sendForm;