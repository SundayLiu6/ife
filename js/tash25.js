var root = document.getElementById("root");
var button = document.getElementsByTagName("button");
var serchList = [];

function addChild(obj,name){
	
	if (name == "") {
		alert("请输入结点名称！");
	} else if(name == null){
		
	}else {
		var newNode = document.createElement("div");
		newNode.className = "visible";
		var newHeader = document.createElement("label");
		var newSymbol = document.createElement("div");
	    newSymbol.className = "arrow empty-arrow";
		var newTitle = document.createElement("span");
		newTitle.className = "title empty-title";
		newTitle.innerHTML = name;
		var newSpace = document.createElement("span");
		newSpace.innerHTML = "&nbsp;&nbsp;";
		var newAdd = document.createElement("img");
		newAdd.className = "add";
		newAdd.src = "img/add.png";
		var newDel = document.createElement("img");
		newDel.className = "del";
		newDel.src = "img/del.png";
		newHeader.appendChild(newSymbol);
		newHeader.appendChild(newTitle);
		newHeader.appendChild(newSpace);
		newHeader.appendChild(newAdd);
		newHeader.appendChild(newDel);
		newNode.appendChild(newHeader);
		obj.appendChild(newNode);
		render(true,true);
	}
}

function deleteChild(obj){
	obj.parentNode.removeChild(obj);
	render(true,true);
}

//判断是否为叶节点
function isLeaf(node){
	if (node.nextElementSibling == null) {
		return true;
	} else{
		return false;
	}	
}
//判断节点展开状态，true 折叠
function isFolded(node){
	if (node.nextElementSibling != null && node.nextElementSibling.className == "hidden") {
		return true;
	} else{
		return false;
	}
}

function render(title,arrow, visibility, toHighlight,obj){
	var labels = document.getElementsByTagName("label");
	if (title) {
		for (var l=0;l<labels.length;l++ ) {
			if (isLeaf(labels[l])) {
				labels[l].getElementsByClassName("title")[0].className = "title empty-title";
			} else {
				labels[l].getElementsByClassName("title")[0].className = "title full-title";
			}
		} 
	}
	
	if(arrow){
		for (var l=0;l<labels.length;l++ ) {
			if (isLeaf(labels[l])) {
				labels[l].getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
			} else if (isFolded(labels[l])) {
				labels[l].getElementsByClassName("arrow")[0].className = "arrow right-arrow";
			} else {
				labels[l].getElementsByClassName("arrow")[0].className = "arrow down-arrow";
			}
		} 
	}
	
	if (visibility) {
		if (obj.className.indexOf("visible") == -1) {//不可见
			obj.className = obj.className.replace("hidden","visible");
		} else{
			obj.className = obj.className.replace("visible","hidden");
		}
	}
	
	if (toHighlight) {
		obj.className = "title Highlight-title";
	}
	nodeOption();
}
//添加、删除节点操作
function nodeOption(){
	var add = document.getElementsByClassName("add");
	var del = document.getElementsByClassName("del");
	for (var a in add) {
		add[a].onclick = function(e){
			addChild(e.target.parentNode.parentNode,prompt("请输入子结点的内容："));
		}
	}
	for (var d in del) {
		del[d].onclick = function(e){
			deleteChild(e.target.parentNode.parentNode);
		}
	}
}
//展开合并操作
function flodOption(){
	var arrow = document.getElementsByClassName("arrow");
	var title = document.getElementsByClassName("title");
	for (var a in arrow) {
		arrow[a].onclick = function(e){
			if (!isLeaf(e.target)) {
				var nodes = e.target.parentNode.parentNode.children;
				for (var i =0 ;i<nodes.length;i++) {
					render(false,false,true,false,nodes[i]);
				}
			}
		render(false,true);
		}
	}
	
	for (var t in title) {
		title[t].onclick = function(e){
			if (!isLeaf(e.target)) {
				var nodes = e.target.parentNode.parentNode.children;
				for (var i =0 ;i<nodes.length;i++) {
					render(false,false,true,false,nodes[i]);
				}
			}
		render(false,true);
		}
	}
}

function serch(data){
	var title = document.getElementsByClassName("title");
	serchList = [];
	for (var t in title) {
		if (title[t].innerHTML == data) {
			serchList.push(title[t]);
		}
	}
}

function init(){
	addChild(root,"Food");
	addChild(root,"Ainamal");
	addChild(root,"Transport");
	addChild(root.children[1],"Fruit");
	addChild(root.children[2],"Pet");
}

window.onload = function(){
	init();
	nodeOption();
	flodOption();
	button[0].onclick = function(){		
		var input = document.getElementById("serch").value.trim();
		render(true);
		if (input == "") {
			document.getElementById("result").innerHTML = "请输入查询内容！";
		} else{
			serch(input);
			if (serchList.length == 0) {
				document.getElementById("result").innerHTML = "没有查询到符合条件的结点！";
			} else{
				var serchNode;
				document.getElementById("result").innerHTML = "查询到" + serchList.length + "个符合条件的结点";
				for(var i=0;i<serchList.length;i++){
					render(false,false,false,true,serchList[i]);
					serchNode = serchList[i].parentNode.parentNode;
					while (serchNode.parentNode != null){
						if (serchNode.className == "hidden") {
							for (var i=0;i<serchNode.parentNode.children.length;i++) {
								render(false,false,true,false,serchNode.parentNode.children[i]);
							}
						}
						serchNode = serchNode.parentNode;
					}
				}
			}
		}
	};
	button[1].onclick = function(){
		document.getElementById("serch").value = "";
		document.getElementById("result").innerHTML = "";
		render(true);
	}
}
