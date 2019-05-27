
//Функция обработки HTML шаблона, возвращающая строку или готовый фрагмент
function html(str, obj, isElement){

	str = String(str);

	//Функция замены ключа на значение
	function forReg(str, key, val){

		let reg = new RegExp("{"+key+"}", "g"),
			out = str.replace(reg, val);

		return out;

	}

	//Проверка на наличие объекта
	if(!(obj instanceof Object)){

		throw error = new Error('Second parameter must be an Object');

	}

	//Замена ключей шаблона
	for(key in obj){

		str = forReg(str, key, obj[key]);

	}


	//Возврат str для работы с помощью innerHTML или insertAdjacentHTML
	if (isElement != true){

		return str;

	} else {

		//Возврат фрагмента
		let fragment 	= document.createDocumentFragment(),
			div 		= document.createElement("div");

		div.innerHTML = str;

		let children 	= div.childNodes;
			len 		= children.length;

		for (let i = 0; i < len; i++){

			fragment.appendChild(children[0]);

		}

		return fragment;

	}
	
	

}


//Создание тестового элемента
var doc = html("<div>USER ID : {id}</div><div>NAME : {name}</div>",{
	name 	: "Vlad",
	id 		: 175
}, true);

document.body.appendChild(doc);
