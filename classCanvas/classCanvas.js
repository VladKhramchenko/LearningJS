class Canv{


	constructor(width, height){
		let element = this.element = document.createElement('canvas');
		this.setSize(width, height);

		//Получение индекса канваса
		this.n = Canv.canvasId();
		element.id = "canvas-" + this.n;

		//Создание кэша для нарисованных/удалённых линий
		element.cash = [];
		element.removed = [];

		this.addPrintLine();

	}

	//Функция получения ндекса канваса
	static canvasId(){

		if (Canv.n == undefined){

			Canv.n = 0;

		} else{
 
			Canv.n++;

		}

		return Canv.n;

	}


	//Функция рисования линии
	printLine(e){

		let canvas 	= this,
			context = canvas.getContext('2d');

		//Обнуление локальной линии и кэша удалённых линий
		canvas.path = [];
		canvas.removed = [];

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

				//Сохранение локального пути
				for (let i = 0; i < len; i++){

					canvas.path.push(coords[i]);

				}

				//Связывание конца данной ломаной с началом следующей
				coords = [[x, y]];

			}

			//Проверка нажатия на канвас
			if(canvas.isDown){
				requestAnimationFrame(animation);
			} else{
				//Занесение локального пути в кэш
				canvas.cash.push(canvas.path);
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
		canvas.isDown = true;
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


	//Функция отмены последнего шага
	stepBack(){

		let canvas 	= document.getElementById(this.name),
			context = canvas.getContext('2d'),
			len 	= canvas.cash.length;

		//Проверка наличия кэша
		if(len > 0){

			//Очистка канваса
			context.clearRect(0, 0, canvas.width, canvas.height);

			//Перерисовывание элементов канваса без последней линии
			for (let i = 0; i < len - 1; i++){

				let cash = canvas.cash[i],
					len  = cash.length;

				context.beginPath();
				context.moveTo(cash[0][0], cash[0][1]);

				for (let j = 1; j < len; j++){

					context.lineTo(cash[j][0], cash[j][1]);

				}

				context.stroke();

			}

			//Добавление последнй линии в кэш удалённых
			canvas.removed.unshift(canvas.cash.pop());

		}

	}


	//Функция возвращения последнего шага
	returnStep(){

		let canvas 	= document.getElementById(this.name),
			context = canvas.getContext('2d'),
			len 	= canvas.removed.length;

		//Проверка наличия отменённых линий
		if(len > 0){

			let last = canvas.removed.shift(),
				len  = last.length;

			//Возвращение последней удалённой линии
			context.beginPath();
			context.moveTo(last[0][0], last[0][1]);

			for (let i = 1; i < len; i++){

				context.lineTo(last[i][0], last[i][1]);

			}

			context.stroke();

			//Добавление возвращённой линии в кэш
			canvas.cash.push(last);

		}

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

		let btn1 = document.createElement('button'),
			btn2 = document.createElement('button'),
			frag = document.createDocumentFragment();

		//Добавление кнопки отмены последнего шага
		btn1.innerHTML = "Отмена";
		btn1.name = 'canvas-' + this.n;
		btn1.onclick = this.stepBack;

		//Добавление кнопки возвращения отменённых шагов
		btn2.innerHTML = "Вернуть";
		btn2.name = 'canvas-' + this.n;
		btn2.onclick = this.returnStep;

		frag.appendChild(this.element);
		frag.appendChild(btn1);
		frag.appendChild(btn2);

		return frag;

	}

}
