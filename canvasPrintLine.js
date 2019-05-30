//Функция для рисования линии на канвасе при нажати ЛКМ
function canvasPrintLine(canvas){

	if(canvas.getContext){
		
		let contextext 		= canvas.getContext("2d");

		canvas.onmousedown = function(e){
			//Получение координат нажатия
			let canvasPosition 	= canvas.getBoundingClientRect(),
				startX 			= e.clientX - canvasPosition.left,
				startY 			= e.clientY - canvasPosition.top;

			//Рисование линии
			canvas.onmousemove = function(e){

				contextext.clearRect(0,0,canvas.width,canvas.height);

				contextext.beginPath();
				contextext.moveTo(startX,startY);
				contextext.lineTo(e.clientX - canvasPosition.left, e.clientY - canvasPosition.top);
				contextext.stroke();

			}

		}

		canvas.onmouseup = function(e){
			//Прекращение рисования линии
			canvas.onmousemove = ()=>{};
		}
	}
}
