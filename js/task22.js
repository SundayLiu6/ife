var preorder = document.getElementById("preorder");
var inorder = document.getElementById("inorder");
var postorder = document.getElementById("postorder");

var root = document.getElementById("tree");
var divList = [];
var timer = null;


function init(){
	divList=[];
	clearInterval(timer);
	var divs = document.getElementsByTagName("div");
	for (var i = 0;i<divs.length;i++) {
		divs[i].style.backgroundColor = '#fff';
	}
}

function preOrder(node){
	if(node != null){
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild)
	}
}

function inOrder(node){
	if(node != null){
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild)
	}
}

function postOrder(node){
	if(node != null){
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild)
		divList.push(node);
	}
}

function setColor(){
	var i = 0;
	divList[i].style.backgroundColor = 'blue';
	timer = setInterval(function(){
		i++;
		if (i<divList.length) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'blue';
		} else{
			clearInterval(timer);
			divList[divList.length-1].style.backgroundColor = '#fff';
		}
	},500);
}

window.onload = function(){
	preorder.onclick = function(){
		init();
		preOrder(root);
		setColor();
	}
	inorder.onclick = function(){
		init();
		inOrder(root);
		setColor();
	}
	postorder.onclick = function(){
		init();
		postOrder(root);
		setColor();
	}
}
