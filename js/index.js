window.onload = function(){
	var menu = document.getElementById("menu").children[0].children;
	for(var i=0;i<menu.length;i++){
		if (i==0) {
			menu[0].onclick = function(){
				clear();
				menu[0].className = "current_page_item";
			}
		} else{
			menu[i].onclick = (function(i){
				return function(){
					clear();
					menu[i].className = "current_page_item";
					location.hash=i;
					return false;
				};
			})(i);
		}
	}
}

function clear(){
	var menu = document.getElementById("menu").children[0].children;
		for (var i = 0; i < menu.length; i++) {
			menu[i].className = "";
		}
	}
