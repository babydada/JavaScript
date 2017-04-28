functon move(e){
	//获取鼠标的x轴
	var pointX = e.pageX;
	//获取鼠标的Y轴
	var pointY = e.pageY;
	//获取大的那个div
	var total = document.getElementById('total');
	//鼠标移向中心点左边，整个div向左旋转
	if(pointX<300){
		total.rotateX(120deg);
	}else if(pointX>300){
		total.rotateX(-120deg);
	}else if(pointY<300){
		total.rotateY(120deg);
	}else if(pointY>300){
		total.rotateY(-120deg);
	}
}

