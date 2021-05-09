const countTimer = deadLine => {

    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getDifferenceTime = () => {
        const currentDate = new Date().getTime();
        const deadLineDate = new Date(deadLine).getTime();
        const differenceDate = Math.floor((deadLineDate - currentDate) / 1000);

        const seconds = Math.floor(differenceDate % 60);
        const minutes = Math.floor(differenceDate / 60 % 60);
        const hours = Math.floor(differenceDate / 3600);

        return { differenceDate, hours, minutes, seconds };
    };

    const getTrueTime = ( elem, objElem ) => {

        if (objElem < 10) {
            elem.textContent = '0' + objElem;
        } else {
            elem.textContent = objElem;
        }

    };

    let idInterval;

    const updateClock = () => {
        const timer = getDifferenceTime();

        if (timer.differenceDate <= 0) {
            clearInterval(idInterval);
            timer.seconds = 0;
            timer.minutes = 0;
            timer.hours = 0;
        }

        getTrueTime(timerSeconds, timer.seconds);
        getTrueTime(timerMinutes, timer.minutes);
        getTrueTime(timerHours, timer.hours);

    };

    updateClock();
    idInterval = setInterval(updateClock, 1000);

};

export default countTimer;