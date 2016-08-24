window.onload =  function(){
	initbuttonClick();
}

var numberData = new Array();

var number = 0;

function addHandler(obj,event,func){
	if (obj.addEventListener) {
		obj.addEventListener(event,func);
	} else if (obj.attachEvent){
		obj.attachEvent('on'+event,func);
	} else {
		obj['on'+event] = func;
	}
}

function inspect(){
	var input = document.getElementById("input");
	if (numberData.length > 60) {
		alert("队列元素已达到上限！");
	}
	if ((/^[0-9]+$/).test(input.value)){
		var int = parseInt(input.value,10);
		if (int >= 10 && int <= 100) {
			return int;
		} else{
			alert("请输入10到100之间的数字！");
			return -1;
		}
	
	} else {
		alert("请输入10到100之间的数字！");
	}
}

function renderList(){
	var html = "";
	for (var num in numberData) {
		html += "<div class='inner' style='height:"+numberData[num]+"px'></div>"
	}
	document.getElementById("box").innerHTML = html;
	initboxClick();
}

function left_in(){
	number = inspect();
	if(number > 0){
		numberData.unshift(number);
		renderList();
	}
}

function right_in(){
	number = inspect();
	if(number > 0){
		numberData.push(number);
		renderList();
	}
}

function left_out(){
	numberData.shift();
	renderList();
}

function right_out(){
	numberData.pop();
	renderList();
}

function random(){
	numberData = numberData.sort(function(){return Math.random()>0.5?-1:1;});
	renderList();
}
//冒泡排序
function bubble(){
	console.log("原序列："+numberData);
	var len = numberData.length;
	for (var i=len;i>0;i--) {
		for (var j=0;j<i-1;j++) {
			if(numberData[j]>numberData[j+1]){
				var temp = numberData[j];
				numberData[j] = numberData[j+1];
				numberData[j+1] = temp;
			}
		}
	}
	console.log("排序后："+numberData);
	renderList();
}
//选择排序
function selection(){
	console.log("原序列："+numberData);
	var len = numberData.length;
	for (var i=0;i<len-1;i++) {
		var minIndex = i;
		for (var j=i+1;j<len;j++) {
			if(numberData[minIndex]>numberData[j]){
				minIndex = j;
			}
		}
		if(minIndex != i){
			var temp = numberData[minIndex];
			numberData[minIndex] = numberData[i];
			numberData[i] = temp;
		}
	}
	console.log("排序后："+numberData);
	renderList();
}
//插入排序
function insertion(){
	console.log("原序列："+numberData);
	var len = numberData.length;
	for (var i=1;i<len;i++) {
		for(var j=i;j>0;j--){
			if(numberData[j]<numberData[j-1]){
				var temp = numberData[j];
				numberData[j] = numberData[j-1];
				numberData[j-1] = temp;
			} else{
				break;
			}
		}
	}
	console.log("排序后："+numberData);
	renderList();
}
//快速排序
function sort(i,len){
	var flag = numberData[i];
	var low = i;
	var high = len;
	while(i<len){
		while(i<len && numberData[len]>=flag){
			len--;
		}
		if(i<len){
			numberData[i] = numberData[len];
			numberData[len] = flag;
			i++;
		}
		while(i<len && numberData[i]<=flag){
			i++;
		}
		if(i<len){
			numberData[len] = numberData[i];
			numberData[i] = flag;
			len--;
		}
	}	
	if(i>low){
		sort(low,i-1);
	}
	if(len<high){
		sort(i+1,high);
	}
}

function quick(){
	console.log("原序列："+numberData);
	var len = numberData.length;
	var i=0;
	sort(i,len-1);
	console.log("排序后："+numberData);
	renderList();
}
//希尔排序
function shell(){
	console.log("原序列："+numberData);
	var len = numberData.length;
	while(true){
		var d = Math.floor(len/2);
		for(var i=0;i<d;i++){
			for(var j=i;j+d<numberData.length;j+=d){
				for(var k=j+d;k>0;k-=d){
					if(numberData[k]<numberData[k-d]){
						var temp = numberData[k-d];
						numberData[k-d] = numberData[k];
						numberData[k] = temp;
					}else{
						break;
					}
				}
			}
		}
		len = d;
		if(d==1){
			break;
		}
	}
	console.log("排序后："+numberData);
	renderList();
}
function boxClick(num){
	numberData.splice(num,1);
	renderList();
}

function initboxClick(){
	var list = document.getElementById("box").childNodes;
	for (var i=0; i<list.length; i++) {
		//这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的i值(length);
		addHandler(list[i],'click',function(i){
			 return function(){boxClick(i)};
		}(i));
	}
}
function initbuttonClick(){

	addHandler(document.getElementById("left_in"),'click',left_in);
	addHandler(document.getElementById("right_in"),'click',right_in);
	addHandler(document.getElementById("left_out"),'click',left_out);
	addHandler(document.getElementById("right_out"),'click',right_out);
	addHandler(document.getElementById("random"),'click',random);
	addHandler(document.getElementById("bubble"),'click',bubble);
	addHandler(document.getElementById("selection"),'click',selection);
	addHandler(document.getElementById("insertion"),'click',insertion);
	addHandler(document.getElementById("quick"),'click',quick);
	addHandler(document.getElementById("shell"),'click',shell);

}