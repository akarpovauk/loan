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
				this.slideIndex = this.slides.length;
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
			// console.log(this.slides);
			// this.slides.forEach(slide => {
			// 	slide.classList.add('animated');
			// 	slide.classList.remove('fadeIn');
			// 	slide.style.display = 'none';
			// });
			for (const slide of this.slides) {
				slide.classList.add('animated');
				slide.classList.remove('fadeIn');
				slide.style.display = 'none';
			}
				
			this.slides[this.slideIndex - 1].classList.add('fadeIn');
			this.slides[this.slideIndex - 1].style.display = 'block';
		} catch(e) {}
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.plusSlides(1);
			});

			btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
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
		}
	} 
}