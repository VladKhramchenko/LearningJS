class Canv{


	constructor(width, height){
		let element = this.element = document.createElement('canvas');
		this.setSize(width, height);
		this.isDown = false;
		this.addPrintLine();

	}


	//Функция рисования линии
	printLine(e){

		let canvas = e.target,
			context = canvas.getContext('2d');

		//Функция получения координат точек ломаной
		function getCoord(e){
			let newX = e.clientX - canvasPosition.left,
				newY = e.clientY - canvasPosition.top;
			coords.push([newX, newY]);
		}

		//Функция рисования ломаной
		let animation = () => {

			let len = coords.length;

			//Проверка на наличие как минимум 2ух точек
			if (len > 1){

				let x, y;

				//Начало рисования
				context.beginPath();
				context.moveTo(coords[0][0],coords[0][1]);

				//Рисование отрезков
				for (let i = 1; i < len; i++){

					x = coords[i][0];
					y = coords[i][1];
					context.lineTo(x, y);

				}

				context.stroke();

				//Связывание конца данной ломаной с началом следующей
				coords = [[x, y]];

			}

			//Проверка нажатия на канвас
			if(this.isDown){
				requestAnimationFrame(animation);
			} else{
				canvas.removeEventListener('mousemove', getCoord);
			}

		}


		//Инициализация первой точки линии
		let canvasPosition 	= canvas.getBoundingClientRect(), 
			firstX = e.clientX - canvasPosition.left,
		 	firstY = e.clientY - canvasPosition.top,
		 	coords = [[firstX, firstY]];

		//Получение координат новой точки
		canvas.addEventListener('mousemove', getCoord);
	 	
		//Начало рисования линии
		this.isDown = true;
		requestAnimationFrame(animation);
	}


	//Функция прекращения удерживания ЛКМ
	falseIsDown(e){

		this.isDown = false;

	}


	//Функция рисования линии на канвасе при нажатой ЛКМ
	addPrintLine(){

		this.removePrintLine();
		
		let canvas = this.element;

		if(canvas.getContext){

			//События вызывающие начало/прекращение рисования линии
			canvas.addEventListener('mousedown', this.printLine);

			canvas.addEventListener('mouseup', this.falseIsDown);
			canvas.addEventListener('mouseleave', this.falseIsDown);

		}

	}


	//Функция отмены рисования линии на канвасе при нажатой ЛКМ
	removePrintLine(){

		let canvas = this.element;

		//Очистка событий вызывающих начало/прекращение рисования линии
		canvas.removeEventListener('mousedown', this.printLine);

		canvas.removeEventListener('mouseup', this.falseIsDown);
		canvas.removeEventListener('mouseleave', this.falseIsDown);

	}


	//Функция задания размера канваса
	setSize(width, height){
		this.element.width = +width;
		this.element.height = +height;
	}


	//Функция задания ширины канваса
	set width(width){
		this.element.width = +width;
	}


	//Функция задания высоты канваса
	set height(height){

		this.element.height = +height;

	}


	//Функция возвращающая канвас
	get canvas() {

		return this.element;

	}

}
