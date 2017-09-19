$(function(){
	var now=0;		//定义当前的索引值
	var now1=0;		//定义鼠标移入时的某一个
	var time=null;		//定义定时器名字
	
	$(".fivedot>li").on(
	{	
		mouseover:function(){
			now1 = $(this).index(); 
			console.log(now);
			$('.fivedot>li').addClass('nav-selected');
			$($('.fivedot>li')[now1]).removeClass('nav-selected');
			clearInterval(time);
		},
		
		mouseout:function(){
			$($('.fivedot>li')[now1]).addClass('nav-selected');
			$($('.fivedot>li')[now]).removeClass('nav-selected');
			time = setInterval(next, 3000);
		},
		click:function(){
//			clearInterval(time);
			now = $(this).index();
			play();
		}
	});
	
	//播放函数
	function play(){
		$('.slider>li>a>img').fadeOut(400);
		$($('.slider>li>a>img')[now]).fadeIn(400);
		
		$('.fivedot>li').addClass('nav-selected');
		$($('.fivedot>li')[now]).removeClass('nav-selected');
	}
	
	//下一张图片
	function next(){
		if(now++==$('.slider>li>a>img').length-1){
			now=0;
		}
		play();
	}
	
	//上一张图片
	function prev(){
		if(now--==0){
			now=$('.slider>li>a>img').length-1;
		}
		play();
	}
	
	// 自动播放
	time = setInterval(next, 3000);
	
	
	
	// 鼠标移除暂停移出播放
	$('.banner').on({
		mouseover:function(){
			$(".left").css({opacity:'1'});
			$(".right").css({opacity:'1'});
			clearInterval(time);
		},
		mouseout:function(){
			time = setInterval(next, 3000);
			$(".left").css({opacity:'0'});
			$(".right").css({opacity:'0'});
		}
	});
});