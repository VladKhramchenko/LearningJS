
//Функция обработки HTML шаблона, возвращающая готовый фрагмент
function html(str, obj){

	str = String(str);

	//Функция замены ключа на значение
	function forReg(str, key, val){

		let reg = new RegExp("{"+key+"}", "g"),
			out = str.replace(reg, val);

		return out;

	}

	//Проверка на наличие объекта
	if(obj != undefined && !(obj instanceof Object)){

		throw error = new Error('Second parameter must be an Object');

	}

	//Замена ключей шаблона, если есть объект
	if(obj instanceof Object){

		for(key in obj){

			str = forReg(str, key, obj[key]);

		}

	}

	//Возвращение фрагмента
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
