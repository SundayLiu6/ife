var button = document.getElementsByTagName("button");
var root = document.getElementById("root");
var select = null;

var dataList = [];
var serchList = [];
var timer = null;
var Bindex= 0;
var flag = false;

function clear(){
	dataList = [];
	serchList = [];
	Bindex = 0;
	flag = false;
	clearInterval(timer);
	var div = document.getElementsByTagName("div");
	for (var d=0;d<div.length;d++) {
		div[d].style.backgroundColor = "#fff";
	}
}

function divSelect(){
	var div = document.getElementsByTagName("div");
	for (var d=0;d<div.length;d++) {
		div[d].onclick = function(e){
			clear();
			select = this;
			this.style.backgroundColor = "#75B86B";
			e.stopPropagation();
		}
	}
}

function depth(node){
	if (node&&node.style.display != "none") {
		dataList.push(node);
		for (var i=0;i<node.children.length;i++) {
			depth(node.children[i]);
		}
		
	}	
}

function breadth(node){
	if (node&&node.style.display != "none") {
		dataList.push(node);
		breadth(node.nextElementSibling);
		node = dataList[Bindex++];
		breadth(node.firstElementChild);
	}
}

function serch(data){
	for (var d in dataList) {
		if (dataList[d].firstChild.nodeValue.trim() == data) {
			flag = true;
			break;
		} else{
			serchList.push(dataList[d]);
		}
	}
	
	if (serchList.length != 0) {
		var i = 0;
		serchList[i].style.backgroundColor = 'blue';
		
		timer = setInterval(function(){
			i++;
			if (i<serchList.length) {
				serchList[i-1].style.backgroundColor = '#fff';
				serchList[i].style.backgroundColor = 'blue';
			} else{
				serchList[serchList.length-1].style.backgroundColor = '#fff';
				if (flag) {
					dataList[serchList.length].style.backgroundColor = 'red';
				} else {
					alert("未找到对应节点！");
				}
				clearInterval(timer);
			}
		},500);
		
	} else{
		dataList[0].style.backgroundColor = 'red';
	}
}

function setColor(){
	var i = 0;
	dataList[i].style.backgroundColor = "blue";
	timer = setInterval(function(){
		i++;
		if (i<dataList.length) {
			dataList[i-1].style.backgroundColor = '#fff';
			dataList[i].style.backgroundColor = 'blue';
		} else{
			dataList[dataList.length-1].style.backgroundColor = '#fff';
			clearInterval(timer);
		}
	},500)
}

window.onload = function(){
	divSelect();
	button[0].onclick = function(){
		if (select != null) {
			select.style.display = "none";
		} else {
			alert("请选择相应节点！");
		}
		divSelect();
	}
	button[1].onclick = function(){
		if (select != null) {
			var inputData = document.getElementById("add").value;
			var html = "<div>"+inputData+"</div>";
			select.innerHTML += html;
			select.children[select.children.length-1].style.backgroundColor = '#fff';
		} else {
			alert("请选择相应节点！");
		}
		divSelect();
	}
	button[2].onclick = function(){
		clear();
		depth(root);
		setColor();
	}
	button[3].onclick = function(){
		clear();
		breadth(root);
		setColor();
	}
	button[4].onclick = function(){
		var data = document.getElementById("serch").value;
		clear();
		depth(root);
		serch(data);
	}
	button[5].onclick = function(){
		var data = document.getElementById("serch").value;
		clear();
		breadth(root);
		serch(data);
	}
}
