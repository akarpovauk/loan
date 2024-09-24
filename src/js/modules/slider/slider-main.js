import Slider from './slider';

export default class MainSlider extends Slider {
	constructor(btns) {
		super(btns);
	}

	showSlides(n) {
		try {
			if (n > this.slides.length) {
				this.slideIndex = 1;
			}
			if (n < 1) {
				index = this.slides.length;
			}
	
			try {
				this.hanson.style.opacity = '0';
				if (n === 3) {
					this.hanson.classList.add('animated');
					setTimeout(() => {
						this.hanson.style.opacity = '1';
						this.hanson.classList.add('slideInUp');
					}, 3000);
				} else {
					this.hanson.classList.remove('slideInUp');
				}
			} catch(e) {}

			for (const slide of this.slides) {
				slide.classList.add('animated');
				slide.classList.remove('fadeIn');
				slide.style.display = 'none';
			}

			this.slides[this.slideIndex - 1].classList.add('fadeIn');
			this.slides[this.slideIndex - 1].style.display = 'block';
		} catch(e) {}
	}

	link() {
		let path = 'modules.html';
		const link = document.createElement('a');
		link.setAttribute('href', path);
		link.style.display = 'none';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	linkPageToModels() {
		const trigger = document.querySelector('.showup__content-explore .plus');
		trigger.addEventListener('click', () => {
			this.link();
		});
	}

	linkCardsToModels(cards) {
		this.cards = document.querySelectorAll(cards);
		this.cards.forEach(card => {
			card.addEventListener('click', () => {
				if (card.classList.contains('card-active')) {
					let index = card.querySelector('.card__controls-count');
					index = +index.textContent.replace(/[^0-9]/g, '');
					this.link();
					localStorage.setItem('index', index);
				}
			});
		});
	}

	showModel() {
		try { 
			let index = localStorage.getItem('index');
			this.slideIndex = +index;
			if (this.container.classList == 'moduleapp') {
				localStorage.removeItem('index');

				this.showSlides(this.slideIndex);
				// this.bindTriggers();
			}
		} catch(e){}
	}

	plusSlides(n) {
		if (!this.slideIndex) {
			this.slideIndex = 1;
		}
		this.showSlides( (this.slideIndex) += n);
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.plusSlides(1);
			});
			btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
				if (this.container.classList == 'page') {
					e.preventDefault();
					this.slideIndex = 1;
					this.showSlides(this.slideIndex);
				}
			});
		});

		this.prevModule.forEach(arrow => {
			arrow.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.plusSlides(-1);
			});
		});
		this.nextModule.forEach(arrow => {
			arrow.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.plusSlides(1);
			});
		});
	}

	render() {
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch(e){}
			this.showSlides(this.slideIndex);
			this.bindTriggers();
			try {
				this.showModel();
				this.linkPageToModels();
				this.linkCardsToModels('.showup__content-slider .card');
				this.linkCardsToModels('.modules__content-slider .card');
			} catch(e) {}
		}
	} 
}