//Функция для рисования линии на канвасе при нажатой ЛКМ
function canvasPrintLine(canvas){

	if(canvas.getContext){
		
		let context 	= canvas.getContext('2d');


		//Функция для рисования отрезка линии
		function printLine(e){
			//Получение координат нажатия
			let canvasPosition 	= canvas.getBoundingClientRect(),
			startX 			= e.clientX - canvasPosition.left,
			startY 			= e.clientY - canvasPosition.top;

			context.lineTo(e.clientX - canvasPosition.left, e.clientY - canvasPosition.top);
			context.stroke();
			context.beginPath();
			context.moveTo(startX,startY);
		}


		//Функция для начала рисования линии
		function startPrintLine(){
			canvas.addEventListener('mousemove', printLine);
		}

		//Функция для прекращения рисования линии
		function stopPrintLine(){
			canvas.removeEventListener('mousemove', printLine);
			context.beginPath();
		}


		//События вызывающие начало/прекращение рисования
		canvas.addEventListener('mousedown', startPrintLine);

		canvas.addEventListener('mouseup', stopPrintLine);
		canvas.addEventListener('mouseleave', stopPrintLine);
	}
}
