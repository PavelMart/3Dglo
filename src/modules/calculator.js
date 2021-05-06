const calculator = (price) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        total = document.getElementById('total');

    // allowed simbols 
    calcBlock.addEventListener('keypress', event => {
        const key = event.key;
        const target = event.target;
        const notNumbers = /\D/;

        if (target.tagName === 'INPUT') {
            if (key.match(notNumbers)) {
                event.preventDefault();
            }
        } 
    }); 
    
    // calculation
    calcBlock.addEventListener('change', event => {
        const target = event.target;
        const notNumbers = /\D/g;

        if (target.tagName === 'INPUT') {
            if (notNumbers.test(target.value)) {
                alert('Некорректные данные! Введите необходимое число цифрами!');
                target.value = '';
                return;
            }
        } 

        let sum = 0,
            countRoom = 1,
            countDay = 1;

        if (calcCount.value && calcCount.value > 1) {
            countRoom += (calcCount.value - 1) / 10;
        } 

        if (calcDay.value && calcDay.value < 5) {
            countDay = 2;
        } else if (calcDay.value && calcDay.value < 10 ) {
            countDay = 1.5;
        }

        if (calcType.value && calcSquare.value) {
            sum = Math.floor(price * calcType.value * calcSquare.value * countRoom * countDay);
        }

        total.textContent = sum;
    });
};

export default calculator;