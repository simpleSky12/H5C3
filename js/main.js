$(function() {
	// 1、初始化
	$('#fullpage').fullpage({
		// 2、为每一个屏幕配置颜色
		sectionsColor: ['#fadd67', '#84a2d4', '#ef674d', '#ffeedd', '#d04759', '#84d9ed', '#8ac060'],
		// 3、页面内容不垂直居中,修改成顶部对齐
		verticalCentered: false,
		// 4、设置指示器
		navigation: true,
		// 5、整屏切换动画的时长
		scrollingSpeed: 1000,
		// 6、监听进入某一屏的时间 回调函数 afterLoad接收两个参数（锚点链接，index）
		afterLoad: function (link, index) {
			// index 从1开始
			$('.section').eq(index-1).addClass('now');
		},
		// 在组件初始化或者插件内容渲染完毕后调用下一页这个方法
		afterRender: function () {
			// 在jquery插件初始化的时候封装这个方法 moveSectionDown（）
			// 回想jquery插件的封装 $.fn.fullpage = function() {}
			// jquery本事没有的方法可以通过$.fn的方式来追加， 认为是插件方法
			
			// 点击“继续往下” 来切换下一页
			$('.more').on('click', function () {
				$.fn.fullpage.moveSectionDown();
			});
			// transitionend 用来监听元素的过渡是否结束，同样也可以使用animationend 来监听元素的动画是否结束
			$('.screen04 .cart').on('transitionend', function(){
				$('.screen04 .address').show();
				$('.screen04 .address').find('img:last').fadeIn(1500);
				$('.screen04 .text').addClass('animation');
			});
			
			// 第八屏的js特效
			// 1、手跟着鼠标移动 思路：让手获取鼠标的坐标，实现跟随效果
			$('.screen08').on('mouseover',function(e){
				$(this).find('.hand').css({
					left: e.clientX - 250,
					top: e.clientY - 130
				});
			}).find('.again').on('click', function(){
				console.log(1);
				// 2. 点击再一次重置动画跳回到第一页
				// 动画是如何进行的
				// 2.1、加 now 类、leave类 、加show类
				$('.now, .leave, .show').removeClass('now').removeClass('show').removeClass('leave');
				// 2.2、加css属性 后果：加一个style属性； 使用jquery方法 show（） fadeIn（） 后果：加style属性
				$('.content [style]').removeAttr('style');
				// 2.3、跳转回第一页
				$.fn.fullpage.moveTo(1);
			});
		},
		// 离开页面时触发函数
		onLeave: function (index,nextIndex,direction) {
			var currentSection = $('.section').eq(index-1)
			if( index == 2 && nextIndex == 3){
				// 当我们从第二页离开切换到第三页的时候触发
				currentSection.addClass('leave');
			} else if(index == 3 && nextIndex == 4){
				currentSection.addClass('leave');
			} else if(index == 5 && nextIndex == 6){
				currentSection.addClass('leave');
				// 为了让沙发和盒子同时开始动画我们需要将他们一起放在页面切换时开始动画
				$('.screen06 .box').addClass('show');
			} else if(index == 6 && nextIndex == 7){
				// 通过遍历star中的每一个img，配合display none来逐个延迟显示每个星星
				$('.screen07 .star img').each(function(i,item){
					$(this).delay(i*0.5*1000).fadeIn();
				});
				$('.screen07 .text').addClass('show');
				// 第二种方法 使用 js控制css3的属性来实现星星的逐个显示
// 				$('screen07 .star').addClass('now');
// 				$('.screen07 .star img').each(function(i,item){
// 					$(this).css('transition-delay', i*0.5+'s');
// 				});
			}
		}
	})
	
})
