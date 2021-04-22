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

		const getTrueTime = ( elem, objElem ) => {

			if (objElem < 10) {
				elem.textContent = '0' + objElem;
			} else {
				elem.textContent = objElem;
			}

		};

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

	// PopUp
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

	// Smooth scrolling
	const getSmoothScrolling = () => {
		
		const menuList = document.querySelector('menu>ul');

		menuList.addEventListener( 'click', e => {
			e.preventDefault();
			const idMenu = e.target.href;
			const idSlide = idMenu.substr(22);

			const slide = document.querySelector(`${idSlide}`);
			const slidePosition = slide.getBoundingClientRect();

			const scrolling = setInterval(() => {

				if (document.documentElement.scrollTop < slidePosition.top) {

					scrollBy(0, 20);
					
				} else {

					clearInterval(scrolling);

				}

			}, 1);
			

		});

	};
	getSmoothScrolling();

});

