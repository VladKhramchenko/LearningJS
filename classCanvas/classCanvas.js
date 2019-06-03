class Canv{

	constructor(width, height){
		let element = this.element = document.createElement('canvas');
		this.setSize(width, height);
		canvasPrintLine(element);
	}

	setSize(width, height){
		this.element.width = +width;
		this.element.height = +height;
	}

	getCanvas(element) {
		return this.element;
	}

}
