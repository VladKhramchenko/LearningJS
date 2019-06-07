class Canv{

	constructor(width, height){
		let element = this.element = document.createElement('canvas');
		this.setSize(width, height);
		addPrintLine(element);
	}

	addPrintLine(){

		removePrintLine(this.element);
		addPrintLine(this.element);

	}

	removePrintLine(){

		removePrintLine(this.element);

	}

	setSize(width, height){
		this.element.width = +width;
		this.element.height = +height;
	}

	setWidth(width){
		this.element.width = +width;
	}

	setHeight(height){
		this.element.height = +height;
	}

	getCanvas(element) {
		return this.element;
	}

}
