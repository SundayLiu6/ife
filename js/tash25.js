var root = document.getElementById("root");

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
		render(true,false,false,false);
	}
}

function deleteChild(obj){
	obj.parentNode.removeChild(obj);
	render(true,false,false,false);
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

function render(arrow, visibility, toHighlight, deHighlight){
	var labels = document.getElementsByTagName("label");
	if(arrow){
		for (var l=0;l<labels.length;l++ ) {
			if (isLeaf(labels[l])) {
				labels[l].getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
				labels[l].getElementsByClassName("title")[0].className = "title empty-title";
			} else if (isFolded(labels[l])) {
				labels[l].getElementsByClassName("arrow")[0].className = "arrow right-arrow";
				labels[l].getElementsByClassName("title")[0].className = "title full-title";
			} else {
				labels[l].getElementsByClassName("arrow")[0].className = "arrow down-arrow";
				labels[l].getElementsByClassName("title")[0].className = "title full-title";
			}
		} 
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

function init(){
	addChild(root,"Food");
	addChild(root,"Ainamal");
	addChild(root,"Transport");
	addChild(root.children[1],"Friut");
	addChild(root.children[2],"Pet");
}

window.onload = function(){
	init();
	nodeOption();
}
