window.onload = function(){
	init();
}
var tag = document.getElementById("tag");
var tagShow = document.getElementById("tagShow");
var hobby = document.getElementsByTagName("textarea")[0];
var btn = document.getElementById("btn");
var hobbyShow = document.getElementById("hobby");

var re = /[^0-9a-zA-Z\u4e00-\u9fa5]/;
var tagList = [];
var dataList = [];

function addHandler(obj,event,func){
	if(obj.addEventListener){
		obj.addEventListener(event,func);
	} else if (obj.attachEvent) {
		obj.attachEvent('on'+event,func);
	} else {
		obj['on'+event] = func;
	}
}
function repeatData(obj,data){
	if (obj == "tag") {
		for (var i in tagList) {
			if(tagList[i] == data){
				return false;
			}
		}
		return true;
	} else{
		for (var j in dataList) {
			if (dataList[j] == data) {
				return false;
			}
		}
		return true
	}
}
function deleteTag(){
	var div = tagShow.childNodes;
	for(var i=0;i<div.length;i++){
		addHandler(div[i],'mouseover',function(e){
			e.target.innerText = '删除：'+e.target.innerText;
			e.target.style.background = "red";
		});
		addHandler(div[i],'mouseout',function(e){
			e.target.innerText = e.target.innerText.replace(/删除：/,'');
			e.target.style.background = "#85CAFF";
		});
		addHandler(div[i],'click',function(i){
			return function(){
				tagList.splice(i,1);
				render();
			};
		}(i))
	}
}

function render(){
	var taghtml = "";
	var hobbyhtml = "";
	if(tagList.length > 10){
		tagList.shift();
	}
	while(dataList.length > 10){
		dataList.shift();
	}
	tagList.map(function(d){
		taghtml += "<div>" + d + "</div>";
	})
	dataList.map(function(e){
		hobbyhtml += "<div>" + e + "</div>";
	})
	tagShow.innerHTML = taghtml;
	hobbyShow.innerHTML = hobbyhtml;
	deleteTag();
}

function showTag(){
	if (re.test(tag.value) || event.keyCode == 13) {
		var data = tag.value.split(re).filter(function(d){
		return d != "";
		});
		var flag = repeatData("tag",data);
		if (flag) {
			tagList = tagList.concat(data);
		}
		tag.value = "";
	}
	render();
}

function showHobby(){
	var data = hobby.value.split(re).filter(function(d){
		var flag = repeatData("hobby",d);
		return d != "" && flag;
	});
	dataList = dataList.concat(data);
	hobby.value = "";
	render();
}
function init(){
	addHandler(tag,'keyup',showTag);
	addHandler(btn,'click',showHobby);
}
