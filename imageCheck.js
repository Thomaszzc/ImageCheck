/**
 * [图片查看器]
 * @param  {[type]} window   [description]
 * @param  {[type]} document [description]
 * @return {[type]}          [description]
 */
(function(window,document){
	'use strict';
	function ImageCheck(param){
		return new ImageCheck.prototype.init(param);
	}
	ImageCheck.prototype={
		constructor:ImageCheck,
		bigImageHost:'storage.lianjia.com',
		smallImageHost:'img.ljcdn.com',
		init:function(param){
			var self=this;
			$('.imageCheck').off('click').on('click',function(e){
				var target=e.target,
					url=$(target).attr('src'),
					newUrl;
				newUrl=url.replace(self.smallImageHost,self.bigImageHost);
				//todo:用正则去掉链接的后缀
				newUrl=newUrl.slice(0,newUrl.length-9);
				if($('#icDialog').length==0){
					_initDOM(url,newUrl);
					_initOptionEvent();
				}
			});

			function _initDOM(smallUrl,bigUrl){
				var	modalDialogStr='<div id="icDialog"><span id="optionClose">X</span><div id="imgContainer"><img id="imageShow" class="imgChangeable"/></div><span id="optionBottom"><span id="optionReset">重置</span><span id="optionLarge">放大</span><span id="currentSize">100</span><span id="optionSmall">缩小</span><span id="optionRotate">旋转</span></span></div>';
				$('body').append(modalDialogStr);
				$('#imageShow').attr('src',smallUrl);
				$('#imageShow').data({
					smallUrl:smallUrl,
					bigUrl:bigUrl
				});
			}

			function _initImageData(){
				var width=$('#imageShow').width(),
					height=$('#imageShow').height();
				$('#imageShow').data({
					originWidth:width,
					originHeight:height,
					width:width,
					height:height,
					rotate:0
				});
			}


			function _initOptionEvent(){
				_initImageData();

				$('#optionClose').off('click').on('click',function(e){
					$('#icDialog').remove();
				});
				$('#optionLarge').off('click').on('click',function(e){
					var curWidth=$('#imageShow').data('width')+20;
					if($('#imageShow').hasClass('imgChangeable')){
						$('#imageShow').removeClass('imgChangeable');
					}
					if($('#imageShow').data('width')>=800&&$('#imageShow').attr('src')!==$('#imageShow').data('bigUrl')){
						$('#imageShow').attr('src',$('#imageShow').data('bigUrl'));
					}
					_scale(curWidth);
									
				});
				$('#optionSmall').off('click').on('click',function(e){
					var curWidth=$('#imageShow').data('width')-20;
					if(curWidth>400){
						_scale(curWidth)
					}
				});

				$('#optionRotate').off('click').on('click',function(e){
					var angle=$('#imageShow').data('rotate'),
						curWidth=$('#imageShow').data('width'),
						curHeight=$('#imageShow').data('height'),
						curRotate=$('#imageShow').data('rotate')+1;

					if(curWidth>curHeight){
						$('#imageShow').css('margin-top',(curWidth-curHeight)/2+'px');
					}else{
						$('#imageShow').css('margin-top',0);
					}
					$('#imageShow').css('transform','rotate('+curRotate*90+'deg)');
					$('#imageShow').data('rotate',curRotate);
				});

				$('#optionReset').off('click').on('click',function(e){
					_reset();
				});
			}

			function _calculateAndSet(){
				var curSize=$('#imageShow').data('width')*$('#imageShow').data('height'),
					originSize=$('#imageShow').data('originWidth')*$('#imageShow').data('originHeight'),
					ratio=parseInt(curSize/originSize*100);
					console.log(ratio);
				$('#currentSize').html(ratio);
			}

			function _scale(curWidth){
				$('#imageShow').width(curWidth);
				$('#imageShow').data('width',curWidth);
				$('#imageShow').data('height',$('#imageshow').height());
				_calculateAndSet();
			}

			function _reset(){
				$('#imageShow').width($('#imageShow').data('originWidth'));
				$('#imageShow').css({
					'transform':'rotate(0deg)',
					'margin-top':0
				});
				$('#currentSize').html('100');
				_initImageData();
			}

		}

	}
	ImageCheck.prototype.init.prototype=ImageCheck.prototype;
	window.ImageCheck=ImageCheck;
})(window,document);