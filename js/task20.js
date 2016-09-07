window.onload = function(){
	init();
}
var data = [];

function addHandler(obj,event,func){
	if (obj.addEventListener) {
		obj.addEventListener(event,func);
	} else if(obj.attachEvent){
		obj.attachEvent('on'+event,func);
	} else {
		obj['on'+event] = func;
	}
}

function insertClick(){
	var str = document.getElementsByTagName("textarea")[0].value;
	var dataList = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e){
		return e != "";
	});
	data = data.concat(dataList);
	render();
}

function serchClick(){
	var input = document.getElementById("serchInput").value.trim();
	render(input);
}
function render(input){
	var html = "";
	data.map(function(d){
		if(input != null && input.length>0){
			d.replace(new RegExp(input,"g"),"<span>"+input+"</span>");
			d = d.replace(new RegExp(input,"g"),"<span>"+input+"</span>");
		}
		html +="<div>" + d +"</div>";
	});
	document.getElementById("result").innerHTML = html;
}

function init(){
	var insert = document.getElementById("insert");
	var serch = document.getElementById("serch");
	addHandler(insert,'click',insertClick);
	addHandler(serch,'click',serchClick);
}
