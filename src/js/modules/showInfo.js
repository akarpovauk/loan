export default class ShowInfo {
	constructor(triggers) {
		this.triggers = document.querySelectorAll(triggers);
	}

	toggleMessage(msgBlock) {
		msgBlock.classList.toggle('msg');
		msgBlock.classList.toggle('slideInUp');
		msgBlock.style.marginTop = '20px';
	}

	bindTriggers() {
		this.triggers.forEach(trigger => {
			const sibling = trigger.closest('.module__info-show').nextElementSibling;
			sibling.classList.add('animated');
			trigger.addEventListener('click',() => {
				this.toggleMessage(sibling);
			});
		});
	}

	init() {
		this.bindTriggers();
	}
}