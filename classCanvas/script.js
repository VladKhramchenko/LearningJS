//Подключение к канвасу функции рисования
let canvas = new Canv(),
	canvas2 = new Canv();

canvas.setSize(500, 500);
canvas2.setSize(300, 300);

document.body.appendChild(canvas.canvas);

let btns = html(`
	<button onclick="canvas.stepBack()">Отмена</button>
	<button onclick="canvas.returnStep()">Вернуть</button>
	<button onclick="canvas.addPrint('Line')">Карандаш</button>
	<button onclick="canvas.addPrint('Straight')">Прямая</button>
	<button onclick="canvas.addPrint('Circle')">Окружность</button>
	<button onclick="canvas.addPrint('Rect')">Прямоугольник</button>`);



document.body.appendChild(canvas2.canvas);
document.body.appendChild(btns);

