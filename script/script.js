window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	// Timer
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

	};

	countTimer('25 april 2021');

	// Menu
	const menuToggle = () => {

		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			btnMenuClose = document.querySelector('.close-btn'),
			menuItems = document.querySelectorAll('li');

		const handlerMenu = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', handlerMenu);

		btnMenuClose.addEventListener('click', handlerMenu);

		menuItems.forEach(item => item.addEventListener('click', handlerMenu));

	};

	menuToggle();

	//PopUp
	const popUpToggle = () => {
		const popupBtnElems = document.querySelectorAll('.popup-btn'),
			popupBtnClose = document.querySelector('.popup-close'),
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

		popupBtnClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});
	};

	popUpToggle();

});

