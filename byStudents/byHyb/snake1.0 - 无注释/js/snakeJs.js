window.onload=function(){
	var osBox=document.getElementById('sBox');

	var snake=[];  
	var dire='l'; 
	var newBody=document.createElement('div');
	newBody.style.background='#f00';
	newBody.style.zIndex=2; 
	snake[0]={l:15,t:8,div:newBody};
	position(snake[0]);
	osBox.appendChild(newBody);
	
	var foods={};
	function foodS(){
		do{
			var success=false;
			var l=parseInt(Math.random()*35);
			var t=parseInt(Math.random()*20);
			for(var i=0;i<snake.length;i++){
				if(l==snake[i].l&&t==snake[i].t)success=true;
			}
		}while(success)
		var newFood=document.createElement('div');
		newFood.style.background='#666';
		foods={l:l,t:t,div:newFood};
		position(foods);
		osBox.appendChild(newFood);
	}
	foodS();

	var timer=setInterval(main,200);	
		
	function main(){
		switch(dire){
			case 'l': snake[0].l--;  break;
			case 'r': snake[0].l++;  break;
			case 't': snake[0].t--;  break;
			case 'b': snake[0].t++;  break;
		};
		
		document.onkeydown=function(ev)
		{
		    var okey=ev||event;
		    if(snake.length==1){
			    switch(okey.keyCode)
			    {
				  case 37: dire='l'; break; //←
				  case 38: dire='t'; break; //↑
				  case 39: dire='r'; break; //→
				  case 40: dire='b'; break; //↓
				}
			}else{
			    switch(okey.keyCode)
			    {
				  case 37: if(dire!='r') dire='l'; break; //←
				  case 38: if(dire!='b') dire='t'; break; //↑
				  case 39: if(dire!='l') dire='r'; break; //→
				  case 40: if(dire!='t') dire='b'; break; //↓
				}
			}
		};
		
		if(snake[0].l==foods.l&&snake[0].t==foods.t){
			snake.push(foods);
			foodS();
		};

		for(var i=0;i<snake.length;i++){
			position(snake[i]);	
		}
		
		for(var j=snake.length-1;j>0;j--){
			snake[j].l=snake[j-1].l;
			snake[j].t=snake[j-1].t;
		};

		if(snake[0].l<0||snake[0].t<0||snake[0].l>34||snake[0].t>19)
		{
			clearInterval(timer);
			osBox.innerHTML='<span>GAME OVER</span>';
		};
		
		for(var h=2;h<snake.length;h++){
			if(snake[0].l==snake[h].l&&snake[0].t==snake[h].t){
				clearInterval(timer);
				osBox.innerHTML='<span>GAME OVER</span>';
				break;
			}
		};
	};

	function position(obj){
		obj.div.style.left=obj.l*20+'px';
		obj.div.style.top=obj.t*20+'px';
	}

};