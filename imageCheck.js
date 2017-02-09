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
				var	modalDialogStr='<div id="icDialog"><span id="optionClose">X</span><div id="imgContainer"><img id="imageShow" class="imgChangeable"/></div><span id="optionBottom"><span id="optionReset">重置</span><span id="optionLarge">放大</span><span id="currentSize">100%</span><span id="optionSmall">缩小</span><span id="optionRotate">旋转</span></span></div>';
				$('body').append(modalDialogStr);
				$('#imageShow').attr('src',smallUrl).attr('data-small',smallUrl).attr('data-big',bigUrl);
			}

			function _initOptionEvent(){
				$('#optionClose').off('click').on('click',function(e){
					$('#icDialog').remove();
				});
				$('#optionLarge').off('click').on('click',function(e){
					var width=$('#imageShow').width(),
						height=$('#imageShow').height(),
						ratio=width/height;
					width+=20;
					height+=20;
					console.debug(width);
					if($('#imageShow').hasClass('imgChangeable')){
						$('#imageShow').removeClass('imgChangeable');
					}
					if(width>=800||height>=800){
						if($('#imageShow').attr('src')!==$('#imageShow').attr('data-big')){
							$('#imageShow').attr('src',$('#imageShow').attr('data-big'));
						}
					}
					if($('#imageShow').data('rotate')/90%2==1){
						$('#imageShow').height(height).width(height*ratio);
					}else{
						$('#imageShow').width(width);
						$('#imageShow').height(width/ratio);
					}						
					$('#currentSize').html(parseInt())
				});
				$('#optionSmall').off('click').on('click',function(e){
					var width=$('#imageShow').width();
					width-=20;
					if(width>400){
						$('#imageShow').css('width',width+'px');	
					}
				});

				$('#optionRotate').off('click').on('click',function(e){
					var angle=$('#imageShow').data('rotate'),
						width=$('#imageShow').width(),
						height=$('#imageShow').height();

					angle=angle==null?0:angle;
					angle+=90;
					$('#imageShow').css('transform','rotate('+angle+'deg)');
					$('#imageShow').data('rotate',angle);
				});
			}

			function _calculateAndSet(){

			}

			function _enLarge(){

			}


		}

	}
	ImageCheck.prototype.init.prototype=ImageCheck.prototype;
	window.ImageCheck=ImageCheck;
})(window,document);