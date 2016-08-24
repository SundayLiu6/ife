var button = document.getElementsByTagName("button");
var div = document.getElementsByTagName("div");
var root = document.getElementById("root");
var dataList = [];
var serchList = [];
var timer = null;
var Bindex = 0;
var flag = false;

function breadth_serch(data){
	if (data) {
		dataList.push(data);
		breadth_serch(data.nextElementSibling);
		data=dataList[Bindex++];
		breadth_serch(data.firstElementChild);
	}
}

function depth_serch(data){
	if(data){
		dataList.push(data);
		for (var i=0;i<data.children.length;i++) {
			depth_serch(data.children[i]);
		}
	}
}

function init(){
	dataList = [];
	serchList = [];
	Bindex = 0;
	flag = false;
	clearInterval(timer);
	for (var i=0;i<div.length;i++) {
		div[i].style.backgroundColor = '#fff';
	}
}

function setColor(){
	var i=0;
	dataList[i].style.backgroundColor = 'blue';
	timer = setInterval(function(){
		i++;
		if (i<dataList.length) {
			dataList[i-1].style.backgroundColor = '#fff';
			dataList[i].style.backgroundColor = 'blue';
		} else{
			dataList[dataList.length-1].style.backgroundColor = '#fff';
			clearInterval(timer);
		}
	},500);
}

function serch(data){
	for (var d in dataList) {
		if (dataList[d].firstChild.nodeValue.trim() == data) {
			flag = true;
			break;
		}else {
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

window.onload = function(){
	button[0].onclick = function(){
		init();
		depth_serch(root);
		setColor();
	}
	button[1].onclick = function(){
		init();
		breadth_serch(root);	
		setColor();
	}
	button[2].onclick = function(){
		var data = document.getElementsByTagName("input")[0].value;
		init();
		depth_serch(root);
		serch(data);
	}
	button[3].onclick = function(){
		var data = document.getElementsByTagName("input")[0].value;
		init();
		breadth_serch(root);
		serch(data);
	}
}
