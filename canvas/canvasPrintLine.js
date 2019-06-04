//Функция рисования линии на канвасе при нажатой ЛКМ
function canvasPrintLine(canvas){

	if(canvas.getContext){
		
		let context = canvas.getContext('2d'),
			isDown 	= false;


		//Функция рисования линии
		function printLine(e){

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


		//События вызывающие начало/прекращение рисования линии
		canvas.addEventListener('mousedown', printLine);

		canvas.addEventListener('mouseup', ()=>isDown = false);
		canvas.addEventListener('mouseleave', ()=>isDown = false);
	}
}
