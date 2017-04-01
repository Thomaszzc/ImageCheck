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
		init:function(param){
			var self=this;
			$('.imageCheck').off('click').on('click',function(e){
				var target=e.target,
					url=$(target).attr('src'),
					pureUrl;

				var imageSuffix=/.\d+(x|X)\d*.(png|jpg|jpeg)/,//匹配图片的大小后缀
					result=url.match(imageSuffix);
				if(result.length>0){
					pureUrl=url.replace(result[0],'');	
				}else{
					console.log('去除图片后缀的时候出错');
				}
				url=pureUrl+'.800x.jpg';//统一让大图的宽为800；
				var desImg=new Image();
				desImg.src=url;
				if($('#icDialog').length==0){
					if(desImg.complete){//大图加载完成后才执行初始化
						_initDOM(url,pureUrl);
						_initOptionEvent();
					}
				}
			});

			function _initDOM(url,pureUrl){
				var	modalDialogStr='<div id="icDialog"><span id="optionClose">X</span><div id="imgContainer"><img id="imageShow" class="imgChangeable"/></div><span id="optionBottom"><span id="optionReset">重置</span><span id="optionLarge">放大</span><span id="currentSize">100</span><span id="optionSmall">缩小</span><span id="optionRotate">旋转</span></span></div>';
				$('body').append(modalDialogStr);
				$('#imageShow').attr('src',url);
				$('#imageShow').data({
					pureUrl:pureUrl,
					url:url
				});
			}

			function _initImageData(){
				$('#imageShow').css({
					'transform':'rotate(0deg) scale(1)'
				}).data({
					scale:1,
					rotate:0
				});
				$('#currentSize').html('100');
			}


			function _initOptionEvent(){
				_initImageData();

				$('#icDialog').draggable();

				$('#optionClose').off('click').on('click',function(e){
					$('#icDialog').remove();
				});
				$('#optionLarge').off('click').on('click',function(e){
					var curScale=$('#imageShow').data('scale')+0.1;
					$('#imageShow').data('scale',curScale);
					_scaleAndRotate();
				});
				$('#optionSmall').off('click').on('click',function(e){
					var curScale=Math.max($('#imageShow').data('scale')-0.1,0.3);
					$('#imageShow').data('scale',curScale);
					_scaleAndRotate();
				});

				$('#optionRotate').off('click').on('click',function(e){
					var curRotate=$('#imageShow').data('rotate')+1;
					$('#imageShow').data('rotate',curRotate);
					_scaleAndRotate();
				});

				$('#optionReset').off('click').on('click',function(e){
					_initImageData();
				});

				$('#imageShow').off('mousewheel').on('mousewheel',function(e){
					e.stopPropagation();
					e.preventDefault();
					if(e.deltaY>0){
						$('#optionLarge').trigger('click');
					}else{
						$('#optionSmall').trigger('click');
					}
				});
				$('#imageShow').draggable();
			}

			function _calculateAndSet(){
				var curScale=$('#imageShow').data('scale'),
					ratio=parseInt(curScale*100);
				$('#currentSize').html(ratio);
			}

			function _scaleAndRotate(){
				var curScale=$('#imageShow').data('scale'),
					curRotate=$('#imageShow').data('rotate');
				$('#imageShow').css('transform','scale('+curScale+') rotate('+curRotate*90+'deg)');
				_calculateAndSet();
			}
		}

	}
	ImageCheck.prototype.init.prototype=ImageCheck.prototype;
	window.ImageCheck=ImageCheck;
})(window,document);