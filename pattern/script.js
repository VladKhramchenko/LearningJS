//Создание тестового элемента
var doc = html("<div>USER ID : {id}</div><div>NAME : {name}</div>",{
	name 	: "Vlad",
	id 		: 175
});

document.body.appendChild(doc);
