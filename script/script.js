window.addEventListener( 'DOMContentLoaded', () => {
	'use strict';

	// Timer
	function countTimer(deadLine) {

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

		const updateClock = () => {
			const timer = getDifferenceTime();

			if (timer.seconds < 10) {
				timerSeconds.textContent = '0' + timer.seconds;
			} else {
				timerSeconds.textContent = timer.seconds;
			}

			if (timer.minutes < 10) {
				timerMinutes.textContent = '0' + timer.minutes;
			} else {
				timerMinutes.textContent = timer.minutes;
			}

			if (timer.hours < 10) {
				timerHours.textContent = '0' + timer.hours;
			} else {
				timerHours.textContent = timer.hours;
			}

			if (timer.differenceDate <= 0) {
				clearInterval(idInterval);
				timerSeconds.textContent = '00';
				timerMinutes.textContent = '00';
				timerHours.textContent = '00';
			}
		};

		const idInterval = setInterval(updateClock, 1000);

	}

	countTimer('13 november 2021');

});

