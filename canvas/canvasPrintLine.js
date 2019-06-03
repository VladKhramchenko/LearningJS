//Функция рисования линии на канвасе при нажатой ЛКМ
function canvasPrintLine(canvas){

	if(canvas.getContext){
		
		let context = canvas.getContext('2d'),
			isDown 	= false;


		//Функция рисования линии
		function printLine(e){

			//Функция получения координат новой точки
			function getCoord(e){
				let canvasPosition 	= canvas.getBoundingClientRect();
				newX = e.clientX - canvasPosition.left;
				newY = e.clientY - canvasPosition.top;
			}

			//Функция рисования отрезка
			function animation(){
				//Получение координат новой точки
				canvas.removeEventListener('mousemove', getCoord);
				canvas.addEventListener('mousemove', getCoord);

				//Рисование отрезка
				context.beginPath();
				context.moveTo(oldX,oldY);
				context.lineTo(newX, newY);
				context.stroke();

				//Обновление начальных координат
				oldX = newX; oldY = newY;

				//Проверка нажатия на канвас
				if(isDown){
					requestAnimationFrame(animation);
				}
			}

			//Инициализация первой точки линии
			let canvasPosition 	= canvas.getBoundingClientRect(), 
				oldX = e.clientX - canvasPosition.left,
			 	oldY = e.clientY - canvasPosition.top,
			 	newX, newY;

			//Начало рисования линии
			isDown = true;
			requestAnimationFrame(animation);
		}


		//События вызывающие начало/прекращение рисования линии
		canvas.addEventListener('mousedown', printLine);

		canvas.addEventListener('mouseup', ()=>isDown = false);
		canvas.addEventListener('mouseleave', ()=>isDown = false);
	}
}
