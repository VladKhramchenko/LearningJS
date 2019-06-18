class Canv{

	constructor(width, height){
		let element = this.element = document.createElement('canvas');
		this.setSize(width, height);

		//Создание кэша для нарисованных/удалённых линий
		element.cash = [];
		element.removed = [];

		this.addPrint('Line');

	}


	//Функция для полученние координат мышки
	static getMouseCoord(e){

		let canvas = e.target,
			canvasPosition 	= canvas.getBoundingClientRect(), 
			newX = e.clientX - canvasPosition.left,
		 	newY = e.clientY - canvasPosition.top;

		canvas.mouseCoord = [newX, newY];

	}


	//Функция для рисования линии
	static line(context, coords){

		let len = coords.length;

		//Начало рисования
		context.beginPath();
		context.moveTo(coords[0][0],coords[0][1]);

		//Рисование отрезков
		for (let i = 1; i < len; i++){
			context.lineTo(coords[i][0], coords[i][1]);
		}

		context.stroke();

	}


	//Функция для рисования круга
	static circle(context, coords){

		let x 		= coords[0],
			y 		= coords[1],
			radius 	= coords[2];

		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false); 
		context.stroke();

	}


	//Функция для рисования прямоугольника
	static rect(context, coords){

		let x1 = coords[0],
			y1 = coords[1],
			x2 = coords[2],
			y2 = coords[3];

		context.strokeRect(x1, y1, x2, y2);

	}


	//Функция для рисование на канвасе из кэша
	static printCash(canvas){

		let context = canvas.getContext('2d'),
			cash 	= canvas.cash,
			len 	= cash.length;

		//Очистка канваса
		context.clearRect(0, 0, canvas.width, canvas.height);

		//Перерисовывание элементов канваса без последней линии
		for (let i = 0; i < len; i++){
			Canv[cash[i][0]](context, cash[i][1]);
		}

	}


	//Функция для подготовки к рисованию
	static startPrint(canvas){

		//Обнуление кэша удалённых элементов канваса
		canvas.removed = [];

		//Получение координат новой точки
		canvas.addEventListener('mousemove', Canv.getMouseCoord);
	 	
		//Начало рисования линии
		canvas.isDown = true;

	}


	//Функция для отмены последнего шага
	stepBack(){

		let canvas 	= this.element,
			context = canvas.getContext('2d'),
			len 	= canvas.cash.length;

		//Проверка наличия кэша
		if(len > 0){

			//Добавление последнй линии в кэш удалённых
			canvas.removed.unshift(canvas.cash.pop());
			Canv.printCash(canvas);

		}

	}


	//Функция для возвращения последнего шага
	returnStep(){

		let canvas = this.element,
			context = canvas.getContext('2d'),
			len 	= canvas.removed.length;

		//Проверка наличия отменённых линий
		if(len > 0){

			//Возвращение последней удалённой линии в кэш
			canvas.cash.push(canvas.removed.shift());
			Canv.printCash(canvas);			

		}

	}


	//Функция для рисования прямой
	printStraight(e){

		//Анимация
		let animation = () => {

			coords[1] = [canvas.mouseCoord[0], canvas.mouseCoord[1]];

			//Рисование прямой
			Canv.printCash(canvas);
			Canv.line(context, coords);

			//Проверка нажатия на канвас
			if(canvas.isDown){
				requestAnimationFrame(animation);
			} else{
				//Занесение прямой в кэш и очистка события получения координат курсора
				canvas.cash.push(['line', coords]);
				canvas.removeEventListener('mousemove', Canv.getMouseCoord);
			}

		}

		let canvas 	= this,
			context = canvas.getContext('2d'),
		//Инициализация первой точки линии
			canvasPosition 	= canvas.getBoundingClientRect(), 
		 	coords = [[e.clientX - canvasPosition.left, e.clientY - canvasPosition.top]];

		//Обновление координат мышки
		canvas.mouseCoord = coords[0];

		//Подготовка к рисованию
		Canv.startPrint(canvas);
		requestAnimationFrame(animation);

	}


	//Функция для рисования круга
	printCircle(e){

		//Анимация
		let animation = () => {

			let width = (canvas.mouseCoord[0] - x),
				height = (canvas.mouseCoord[1] - y),
				radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

			context.clearRect(0, 0, canvas.width, canvas.height);

			Canv.printCash(canvas);
			Canv.circle(context, [x, y, radius]);

			//Проверка нажатия на канвас
			if(canvas.isDown){
				requestAnimationFrame(animation);
			} else{
				//Занесение круга в кэш и очистка события получения координат курсора
				canvas.cash.push([ 'circle', [x, y, radius] ]);
				canvas.removeEventListener('mousemove', Canv.getMouseCoord);
			}

		}

		let canvas 	= this,
			context = canvas.getContext('2d'),
		//Инициализация первой точки линии
			canvasPosition 	= canvas.getBoundingClientRect(), 	
			x = e.clientX - canvasPosition.left,
		 	y = e.clientY - canvasPosition.top;

		//Обновление координат мышки
		canvas.mouseCoord = [x, y];

		//Подготовка к рисованию
		Canv.startPrint(canvas);
		requestAnimationFrame(animation);

	}


	//Функция для рисования прямоугольника
	printRect(e){

		//Анимация
		let animation = () => {

			let x2 = canvas.mouseCoord[0] - x1,
				y2 = canvas.mouseCoord[1] - y1;

			//Рисование прямоугольника
			Canv.printCash(canvas);
			context.strokeRect(x1, y1, x2, y2);

			//Проверка нажатия на канвас
			if(canvas.isDown){
				requestAnimationFrame(animation);
			} else{
				//Занесение прямоугольника в кэш и очистка события получения координат курсора
				canvas.cash.push([ 'rect', [x1, y1, x2, y2] ]);
				canvas.removeEventListener('mousemove', Canv.getMouseCoord);
			}

		}

		let canvas 	= this,
			context = canvas.getContext('2d'),
		//Инициализация первой точки линии
			canvasPosition = canvas.getBoundingClientRect(), 
			x1 = e.clientX - canvasPosition.left,
		 	y1 = e.clientY - canvasPosition.top;

		//Обновление координат мышки
		canvas.mouseCoord = [x1, y1];

		//Подготовка к рисованию
		Canv.startPrint(canvas);
		requestAnimationFrame(animation);

	}


	//Функция для рисования линии
	printLine(e){

		//Функция для получения координат точек ломаной
		function getCoord(e){
			coords.push([e.clientX - canvasPosition.left, e.clientY - canvasPosition.top]);
		}

		//Анимация рисования ломаной
		let animation = () => {

			let len = coords.length;

			//Проверка на наличие как минимум 2ух точек
			if (len > 1){

				//Рисование ломаной
				Canv.line(context, coords);

				//Сохранение локального пути
				for (let i = 0; i < len; i++){
					path.push(coords[i]);
				}

				//Связывание конца данной ломаной с началом следующей
				coords = [ 
							[ coords[len - 1][0], coords[len - 1][1] ] 
						];

			}

			//Проверка нажатия на канвас
			if(canvas.isDown){
				requestAnimationFrame(animation);
			} else{
				//Занесение локального пути в кэш и очистка события получения координат курсора
				canvas.cash.push(['line', path]);
				canvas.removeEventListener('mousemove', getCoord);
			}

		}

		let canvas 	= this,
			context = canvas.getContext('2d'),
		//Создание локального пути
			path = [],
		//Инициализация первой точки линии
			canvasPosition = canvas.getBoundingClientRect(), 
		 	coords = [[e.clientX - canvasPosition.left, e.clientY - canvasPosition.top]];

		//Обнуление кэша удалённых элементов канваса
		canvas.removed = [];

		//Получение координат новой точки
		canvas.addEventListener('mousemove', getCoord);
	 	
		//Начало рисования линии
		canvas.isDown = true;
		requestAnimationFrame(animation);
	}


	//Функция для прекращения удерживания ЛКМ
	falseIsDown(e){

		this.isDown = false;

	}


	//Функция для рисования заданным инструментом
	addPrint(tool){

		this.removePrintAll();

		let canvas 	= this.element,
			func 	= "print" + tool;

		if(canvas.getContext){

			//События вызывающие начало/прекращение рисования заданного элемента
			canvas.addEventListener('mousedown', this[func]);

			canvas.addEventListener('mouseup', this.falseIsDown);
			canvas.addEventListener('mouseleave', this.falseIsDown);

		}

	}


	//Функция для отмены рисования заданным инструментом
	removePrint(tool){

		let canvas 	= this.element,
			func 	= "print" + tool;

		//Очистка событий вызывающих начало/прекращение рисования заданным инструментом
		canvas.removeEventListener('mousedown', this[func]);

		canvas.removeEventListener('mouseup', this.falseIsDown);
		canvas.removeEventListener('mouseleave', this.falseIsDown);

	}


	//Функция для отмены рисования
	removePrintAll(){

		let canvas 	= this.element;

		//Очистка событий вызывающих начало/прекращение рисования
		canvas.removeEventListener('mousedown', this.printLine);
		canvas.removeEventListener('mousedown', this.printStraight);
		canvas.removeEventListener('mousedown', this.printCircle);
		canvas.removeEventListener('mousedown', this.printRect);

		canvas.removeEventListener('mouseup', this.falseIsDown);
		canvas.removeEventListener('mouseleave', this.falseIsDown);

	}


	//Функция для задания размера канваса
	setSize(width, height){
		this.element.width = +width;
		this.element.height = +height;
	}


	//Функция для задания ширины канваса
	set width(width){
		this.element.width = +width;
	}


	//Функция для задания высоты канваса
	set height(height){

		this.element.height = +height;

	}


	//Функция для возвращающая канвас
	get canvas() {

		return this.element;

	}

}

