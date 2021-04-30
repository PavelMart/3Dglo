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

	countTimer('26 april 2021 19:10');

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

	// Slider
	const slider = () => {

		const slider = document.querySelector('.portfolio-content'),
			slide = document.querySelectorAll('.portfolio-item'),
			portfolioDots = document.querySelector('.portfolio-dots');

		for (let i = 0; i < slide.length; i++) {

			const dotElement = document.createElement('li');
			dotElement.classList.add('dot');
			
			if (i === 0) {
				dotElement.classList.add('dot-active');
			}

			portfolioDots.append(dotElement);

		}

		const dot = document.querySelectorAll('.dot');

		let interval;

		let currentSlide = 0;

		const prev = (elem, index, strClass) => {
			elem[index].classList.remove(strClass);
		};

		const next = (elem, index, strClass) => {
			elem[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prev(slide, currentSlide, 'portfolio-item-active');
			prev(dot, currentSlide, 'dot-active');

			currentSlide++;
			
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}

			next(slide, currentSlide, 'portfolio-item-active');
			next(dot, currentSlide, 'dot-active');

		};

		const startSlider = () => {
			interval = setInterval(autoPlaySlide, 2000);
		};

		const stopSlider = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', (event) => {
			event.preventDefault();
			const target = event.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prev(slide, currentSlide, 'portfolio-item-active');
			prev(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-left')) {

				currentSlide--;

			} else if (target.matches('#arrow-right')) {

				currentSlide++;

			}  

			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			} else if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			
			if (target.matches('.dot')) {
				dot.forEach( (item, i) => {
					if (target === item) {
						currentSlide = i;
						return;
					}
				});
			}

			next(slide, currentSlide, 'portfolio-item-active');
			next(dot, currentSlide, 'dot-active');

		});

		slider.addEventListener('mouseover', (event) => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				stopSlider();
			}
		});

		slider.addEventListener('mouseout', (event) => {
			if (event.target.matches('.portfolio-btn, .dot')) {
				startSlider();
			}
		});

		startSlider();

	};
	slider();

	// calculator
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
	calculator(100);

	// Change Photo of command
	const changePhoto = () => {
		const commandPhotos = document.querySelectorAll('.command__photo');

		commandPhotos.forEach( item => {
			const src = item.src;
			const datasetImg = item.dataset.img;

			item.addEventListener('mouseover', () => {
				item.src = datasetImg;
			});
			item.addEventListener('mouseout', () => {
				item.src = src;
			});
		});
	};
	changePhoto();


});

