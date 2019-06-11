//Подключение к канвасу функции рисования
let canvas = new Canv(),
	canvas2 = new Canv();

canvas.setSize(500, 500);
canvas2.setSize(300, 300);
canvas2.removePrintLine();

document.body.appendChild(canvas.canvas);
document.body.appendChild(canvas2.canvas);
