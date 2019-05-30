//Создание тестового элемента
var doc = html("<div>USER ID : {id}</div><div>NAME : {name}</div>",{
	name 	: "Vlad",
	id 		: 175
}, true);

document.body.appendChild(doc);

//Подключение к канвасу функции рисования
var canvas = document.getElementById("canvas");
canvasPrintLine(canvas);
