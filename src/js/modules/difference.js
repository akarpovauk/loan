export default class Difference {
	constructor(oldOfficer, newOfficer, items) {
		try {
			this.oldOfficer = document.querySelector(oldOfficer);
			this.newOfficer = document.querySelector(newOfficer);
			this.oldItems = this.oldOfficer.querySelectorAll(items);
			this.newItems = this.newOfficer.querySelectorAll(items);
			this.oldCounter = 0;
			this.newCounter = 0;
		} catch(e) {}
	}

	bindTriggers(column, items, counter ) {
		column.querySelector('.plus').addEventListener('click', () => {
			if(counter !== items.length - 2) {
				items[counter].style.display = 'flex';
				items[counter].classList.add('fadeIn');
				counter++;
			} else {
				items[counter].style.display = 'flex';
				items[counter].classList.add('fadeInUp');
				items[items.length - 1].remove();
			}
		});

	}

	hideitems(items) {
		items.forEach((item, i, arr) => {
			item.classList.add('animated');
			if( i !== arr.length - 1) {
				item.style.display = 'none';
			}
		});
	}

	init() {
		try {
			this.hideitems(this.oldItems);
			this.hideitems(this.newItems);
			this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
			this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);
		} catch(e) {}
	}
}