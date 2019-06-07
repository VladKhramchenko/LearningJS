//Переменная для определения удерживания ЛКМ
let isDown 	= false;

//Функция рисования линии
function printLine(e){

	let canvas = e.target,
		context = canvas.getContext('2d');

	//Функция получения координат точек ломаной
	function getCoord(e){
		newX = e.clientX - canvasPosition.left;
		newY = e.clientY - canvasPosition.top;
		coords.push([newX, newY]);
	}

	//Функция рисования ломаной
	function animation(){

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
		if(isDown){
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
	isDown = true;
	requestAnimationFrame(animation);
}

//Функция прекращения удерживания ЛКМ
function falseIsDown(){

	isDown = false;

}

//Функция рисования линии на канвасе при нажатой ЛКМ
function addPrintLine(canvas){

	if(canvas.getContext){

		//События вызывающие начало/прекращение рисования линии
		canvas.addEventListener('mousedown', printLine);

		canvas.addEventListener('mouseup', falseIsDown);
		canvas.addEventListener('mouseleave', falseIsDown);

	}

}

//Функция отмены рисования линии на канвасе при нажатой ЛКМ
function removePrintLine(canvas){

	//Очистка событий вызывающих начало/прекращение рисования линии
	canvas.removeEventListener('mousedown', printLine);

	canvas.removeEventListener('mouseup', falseIsDown);
	canvas.removeEventListener('mouseleave', falseIsDown);

};