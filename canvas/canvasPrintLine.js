//Функция для рисования линии на канвасе при нажати ЛКМ
function canvasPrintLine(canvas){

	if(canvas.getContext){
		
		let context 	= canvas.getContext("2d"),
			lines 		= [];

		canvas.onmousedown = (e)=>{

			//Рисование линии
			canvas.onmousemove = (e)=>{
				//Получение координат нажатия
				let canvasPosition 	= canvas.getBoundingClientRect(),
				startX 			= e.clientX - canvasPosition.left,
				startY 			= e.clientY - canvasPosition.top;

				context.lineTo(e.clientX - canvasPosition.left, e.clientY - canvasPosition.top);
				context.stroke();
				context.beginPath();
				context.moveTo(startX,startY);
			}

		}

		canvas.onmouseup = (e)=>{
			//Прекращение рисования линии
			canvas.onmousemove = ()=>{};
			context.beginPath();
		}
	}
}
