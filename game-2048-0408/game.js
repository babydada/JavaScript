  // 游戏状态常量
// 游戏进行中
const PLAYING=0;
// 方块移动中
const CELL_MOVING=1;
// 游戏结束
const GAME_OVER=2;
// 分数
var score=0;
// 当前游戏状态
var state=PLAYING;
// 游戏初始化
document.body.onload=function(){
	// 绑定按钮事件
	$('Upbtn').onclick=Upaction;
	$('Downbtn').onclick=Downaction;
	$('Leftbtn').onclick=Leftaction;
	$('Rightbtn').onclick=Rightaction;
	//初始化函数
	init();
}
var cells;
function init(){
	$('Gameover').style.display='none';
	cells=[[],[],[],[]];
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			cells[row][col]=0;
		}
	}
	// 初始化分数
	score=0;
	// 生成随机数
	 randomNumber();
	 randomNumber();
	// 根据当前状态更新视图函数
	updateView();
	state=PLAYING;
}
function randomNumber(){
	if(full()){
		return;
	}
	while(true){
		var row=Math.floor(Math.random()*4);
		var col=Math.floor(Math.random()*4);
		// 随机生成2和4
		if(cells[row][col]==0){
		var n=Math.random()<0.5?2:4;
        cells[row][col]=n;
        break;
        }
	}
}
// 16位置都满的时候
// full检测是否满？
function full(){
	for(var row=0;row<4;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]==0){
				return false;
			}
		}
	}
	return true;
}
function updateView(){
		for(var row=0;row<4;row++){
			for(var col=0;col<4;col++){
				var num=cells[row][col];
			var cell=document.getElementById('cell'+row+col);
			if(num>0){
				cell.className='cell num'+num;
				cell.innerHTML=num;
			}else{
				cell.className='cell';
				cell.innerHTML='';
			}
			}
	}
	 $('score').innerHTML=score;
	$('finalscore').innerHTML=score;
	gameOver();
}
function $(id){
	return document.getElementById(id);
}
// 向上的操作
function Upaction(){
      if(canMoveup()){
      	for(var col=0;col<4;col++){
      		//移动列的放法
      		Upcol(col);
      	}
      	// 随机产生一个2 4
      	randomNumber();
      	// 更新视图
      	updateView();
      }
}
function canMoveup(){
   for(var row=1;row<4;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]!=0){
				if(cells[row-1][col]==0||cells[row-1][col]==cells[row][col]){
					return true;
				}
			}
		}
	}
	return false;
}
function Upcol(col){
    for(var row=0;row<4;){
    	var current=cells[row][col];
    	// 尝试查找下一个数的位置
    	var nextRow=getNextinCol(col,row+1,1);
    	if(nextRow==-1){
    		return;
    	}
    	var next=cells[nextRow][col];
    	if(current==0){
    		cells[row][col]=next;
    		cells[nextRow][col]=0;

    	}else if(current==next){
    		cells[row][col]=current+next;
    		cells[nextRow][col]=0;
    		score=score+cells[row][col];
    		row++;
    	}else{
    		// 当前行和下一行的值不相等
    		row++;
    	}

    }
}
// 获取当前行接下来第一个带数字的行号
function getNextinCol(col,row,step){
   while(true){
   	if(row<0||row>=4){
   		return -1;
   	}
   	// 返回行号、
   	if(cells[row][col]!=0){
   		return row;
   	}
   	row+=step;

   }
}
function Downaction(){
	 if(canMovedown()){
      	for(var col=0;col<4;col++){
      		//移动列的放法
      		Downcol(col);
      	}
      	// 随机产生一个2 4
      	randomNumber();
      	// 更新视图
      	updateView();
      }
}
function canMovedown(){
   for(var row=0;row<3;row++){
		for(var col=0;col<4;col++){
			if(cells[row][col]!=0){
				if(cells[row+1][col]==0||cells[row+1][col]==cells[row][col]){
					return true;
				}
			}
		}
	}
	return false;
}
function Downcol(col){
     for(var row=3;row>=0;){
    	var current=cells[row][col];
    	// 尝试查找下一个数的位置
    	var nextRow=getNextinCol(col,row-1,-1);
    	if(nextRow==-1){
    		return;
    	}
    	var next=cells[nextRow][col];
    	if(current==0){
    		cells[row][col]=next;
    		cells[nextRow][col]=0;

    	}else if(current==next){
    		cells[row][col]=current+next;
    		cells[nextRow][col]=0;
    		score=score+cells[row][col];
    		row--;
    	}else{
    		// 当前行和下一行的值不相等
    		row--;
    	}

    }
}
function Leftaction(){
	if(canMoveLeft()){
		for(var row=0;row<4;row++){
			moveLeft(row);
		}
		randomNumber();
		updateView();
	}
}
function canMoveLeft(){
	for(var col = 0;col<4;col++){
		for(var row = 0;row<4;row++){
			if(cells[row][col]!=0){
				if(cells[row][col-1]==0||cells[row][col]==cells[row][col-1]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveLeft(row){
	for(var col=0;col<4;){
		var current = cells[row][col];
		var nextCol = getNextInRow(row,col+1,1);
		if(nextCol==-1){
			return;
		}
		var next =cells[row][nextCol];
		if(current==0){
			cells[row][col] = next;
			cells[row][nextCol]=0;
		}else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol] = 0;
			score+=cells[row][col];
			col++;
		}else{
			col++;
		}
	}
}
// function moveLeft(row){
// 	for(var col = 0;col<4;col++){
// 		var current = cells[row][col];
// 		var nextCol = getNextInRow(row,col+1,1);
// 		if(cext)
// 	}
// }
function getNextInRow(row,col,step){
	while(true){
		if(col<0||col>=4){
			return -1;
		}
		if(cells[row][col]!=0){
			return col;
		}
		col+=step;
	}
}
function Rightaction(){
	if(canMoveRight){
		for(var row=0;row<4;row++){
			moveRight(row);
		}
		randomNumber();
		updateView();
	}
}
function canMoveRight(){
	for(var col = 0;col<4;col++){
		for(var row=0;row<4;row++){
			if(cells[row][col]!=0){
				if(cells[row][col]==0||cells[row][col]==cells[row][col + 1]){
					return true;
				}
			}
		}
	}
	return false;
}
function moveRight(row){
	for(var col=3;col>=0;){
		var current = cells[row][col];
		var nextCol = getNextInRow(row,col-1,-1);
		if(nextCol==-1){
			return;
		}
		var next =cells[row][nextCol];
		if(current==0){
			cells[row][col] = next;
			cells[row][nextCol]=0;
		}else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol] = 0;
			score+=cells[row][col];
			col--;
		}else{
			col--;
		}
	}
}
function gameOver(){
	if(canMovedown()||canMoveup()||canMoveRight()||canMoveLeft()){
		return false;
	}
	if(!full()){
		return false;
	}
	state = GAME_OVER;
	$('Gameover').style.display="block";
	return true;
}
$('restart').onclick=init;
$('newgame').onclick=init;