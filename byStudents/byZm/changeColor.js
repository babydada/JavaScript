/*
* @Author: lamco
* @Date:   2017-04-16 18:13:58
* @Last Modified by:   lamco
* @Last Modified time: 2017-04-18 20:50:27
*/

'use strict';


$(function(){
	//奇数行的颜色
	$('table tr:odd').css('background',oddColor);
	//偶数行的颜色
	$('table tr:even').css('background',evenColor);
	//存储原有的属性颜色
	var oldColor;
	//原有的字体大小
	var oldFantSize;
	//原有的表格高度
	var oldHight;
	//定义鼠标移入和移出的事件
	$('table tr').on({
		//移入的事件
		mouseover:function(){
			//传入之前的背景颜色，高度，和字体大小
			oldColor= $(this).css('background-color');
			oldHight=$(this).css('height');
			oldFantSize=$(this).css('fontSize');
			//改变样式
			$(this).css({
				'background':moveColor,
				'height':moveHeight,
				'fontSize':fontSize
			});
		},
		mouseout:function(){
			$(this).css({
				'background':oldColor,
				'height':oldHight,
				'fontSize':oldFantSize
			});
		}
	})
})
