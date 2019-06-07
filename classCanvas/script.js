//Подключение к канвасу функции рисования
let canvas = new Canv(),
	canvas2 = new Canv(400, 400);

canvas.setSize(500, 500);
canvas2.removePrintLine();

document.body.appendChild(canvas.getCanvas());
document.body.appendChild(canvas2.getCanvas());

canvas2.addPrintLine();


