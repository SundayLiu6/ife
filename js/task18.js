window.onload = function(){
	initbuttonClick();
}

function addHandler(obj,event,func){
	if (obj.addEventListener) {
		obj.addEventListener(event,func);
	} else if(obj.attachEvent){
		obj.attachEvent('on'+event,func);
	} else {
		obj['on'+event] = func;
	}
}

function getName(oParent,oClass){
	var list = [];
	var obj = document.getElementById(oParent).getElementsByTagName("*");
	for (var i = 0; i < obj.length; i++) {
		if(obj[i].className == oClass){
			list.push(obj[i]);
		}
	}
	return list;
}

function boxClick(){
	this.parentNode.removeChild(this);
}

function left_in(){
	var num = document.getElementById("input").value;
	if ((/^[0-9]+$/).test(num)) {
		var div = document.createElement("div");
		div.setAttribute("class","box");
		div.innerHTML = num;
		document.getElementById("box").insertBefore(div,document.getElementById("box").firstChild);
		initboxClick();
	} else {
		alert("please input right number!");
	}
}

function left_out(){
	document.getElementById("box").removeChild(document.getElementById("box").firstChild);
	initboxClick();
}

function right_in(){
	var num = document.getElementById("input").value;
	if ((/^[0-9]+$/).test(num)) {
		var div = document.createElement("div");
		div.setAttribute("class","box");
		div.innerHTML = num;
		document.getElementById("box").appendChild(div);
		initboxClick();
	} else {
		alert("please input right number!");
	}
	
}

function right_out(){
	document.getElementById("box").removeChild(document.getElementById("box").lastChild);
	initboxClick();
}

function initbuttonClick(){
	addHandler(document.getElementById("left_in"),'click',left_in);
	addHandler(document.getElementById("left_out"),'click',left_out);
	addHandler(document.getElementById("right_in"),'click',right_in);
	addHandler(document.getElementById("right_out"),'click',right_out);
}
function initboxClick(){
	// var list = getName("box","box");
	// for (var i = 0; i < list.length; i++) {
	// 	addHandler(list[i],'click',boxClick);
	// }
	//  alert(document.getElementById("box").childNodes.length);
	for (var i = 0; i < document.getElementById("box").childNodes.length; i++) {
		addHandler(document.getElementById("box").childNodes[i],'click',boxClick);
	}
}