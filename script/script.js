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

		idInterval = setInterval(updateClock, 1000);

	};

	countTimer('25 april 2021');

	// Menu
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
	menuToggle();

	// PopUp
	const popUpToggle = () => {
		const popupBtnElems = document.querySelectorAll('.popup-btn'),
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

		popup.addEventListener( 'click', (event) => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			}

			target = target.closest('.popup-content');

			if (!target) {
				popup.style.display = 'none';
			}
		});

	};
	popUpToggle();

	// Smooth scrolling
	
	const getSmoothScrolling = () => {
		
		const menuList = document.querySelector('menu > ul');
		const linkToFirstSlide = document.querySelector('main a');

		const getScroll = ( e ) => {

			e.preventDefault();
			const link = e.target.href;
			const id = link.substr(22);
	
			const slide = document.querySelector(`${id}`);
			const slidePosition = slide.offsetTop;
	
			const scrolling = setInterval(() => {
	
				if (document.documentElement.scrollTop < slidePosition) {
	
					scrollBy(0, 20);
					
				} else {
	
					clearInterval(scrolling);
	
				}
	
			}, 1);
	
		};

		linkToFirstSlide.addEventListener( 'click', getScroll );
		menuList.addEventListener( 'click', getScroll );

	};
	getSmoothScrolling();

	// Tabs
	const toogleTabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = document.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const changeTabContent = ( index ) => {
			for (let i = 0; i < tabContent.length; i++) {
	
				if ( index === i ) {
	
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
	
				} else {
					
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');

				}
			}
		};

		tabHeader.addEventListener('click', (event) => {
			let target = event.target;
			target = target.closest('.service-header-tab');
			
			if (target) {

				tab.forEach( (item, i) => {

					if (item === target) {
						changeTabContent(i);
					}

				});

			}

		});
	};	
	toogleTabs();

});

