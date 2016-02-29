$(function() {
	IsPC();

	function IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
	if(IsPC() == true){

		var productImgList = (window.productImgList);
        var imageIndex = 0; // 记录当前弹层在哪里
        var index = $('#menu .focus').attr('data-index');
        var imgcontent = '#imgcontent_'+index;
        
        var menus = $('#menu span'); // 选项
        var highClass = 'focus'; // 高亮样式
        var itemWidth = 960; // 轮播宽度
        var imgStatus = true;
        $('.imgcontent').each(function(){
        	var len = $(this).find('.imglist').length;
        	var width = len*960;
        	$(this).css('width',width+'px');
        })
        // 上一步
        $('.prev').click(function() {
        	if (imgStatus === false) {
        		return;
        	}
        	if (imageIndex === 0) {
        		return;
        	}
        	imageIndex--;
        	$(this).siblings().find('.imgcontent').animate({
        		'margin-left': -imageIndex * itemWidth,
        	},
        	300,
        	function() {
        		imgStatus = true;
        		if (imageIndex === 0) {
        			$(this).parent().siblings('.prev').hide();
        		} else {
        			$(this).parent().siblings('.prev').show();
        		}
        		$(this).parent().siblings('.next').show();
        	}
        	);
        });

        // 下一步
        $('.next').click(function() {
        	var imglength = $(this).siblings().find('.imgcontent').children('.imglist').length;
        	console.log(imageIndex+'======'+imglength);
        	if (imgStatus === false) {
        		return;
        	}
        	if (imageIndex + 1 === imglength) {
        		return;
        	}
        	imgStatus = false;
        	imageIndex++;
        	$(this).siblings().find('.imgcontent').animate({
        		'margin-left': -imageIndex * itemWidth,
        	},
        	300,
        	function() {
        		imgStatus = true;
        		if (imageIndex + 1 === imglength) {
        			$(this).parent().siblings('.next').hide();
        		} else {
        			$(this).parent().siblings('.next').show();
        		}
        		$(this).parent().siblings('.prev').show();
        	}
        	);
        });

        // 菜单切换轮播
        $('#menu_pc').on('click', 'span', function() {
        	var index = $(this).index();
        	var self = $(this);
        	var showTab = '#pro'+index+'_imgmenu'
        	$(showTab).show();
        	$(showTab).siblings('.imgmenu').hide();
        	$(this).addClass(highClass);
        	$(this).siblings().removeClass(highClass);
        	imageIndex = 0;
        	imgStatus = true;
        });


        function get_data_by_type(type, index) {
        	var data = {

        	};
        	return data[type][index];
        }

        //判断图片是存在
        /*$(".smalllist").find("img").load(function(){
        	var _t = $(this);
        	var src = _t.attr("src")||"";
        	if(src.replace(/\s/,'') == ''){
        		_t.parent("li").css("display","none");
        	}
        });*/


		//定义图片的index值
		function getIndex(img){
			var i = -1;
			$("#imgcontent_1").find("img").each(function(ind,item){
				if(item == img){
					i = ind;
					return false;
				}

			});
			return i;
		}

        // 相册点击
        $('.imgmenu').find("img").on('click', function(e) {
        	e.stopPropagation();
        	var self = $(this);
        	var index = getIndex(this);
        	var data =  productImgList[index];
        	if (!data) {
        		return;
        	}
        	$('#x3d').hide();
        	$('#detail').show().attr('src', data.detail);
        	if (!data.hassmall) {
        		$('#imgitem').addClass('imgonly');
        		$('#detail').hide();
        		$('#x3d').show().attr('src',data.detail);
        		return;
        	}
        	$('#imgitem').removeClass('imgonly');
        	var lilist = $('#smalllist li');

            // 小图样式reset
            lilist.removeClass(highClass);
            lilist.first().addClass(highClass);
            var images = data.small.images;

            // 设置小图 判断是否为空
            lilist.each(function(index, dom) {
            	var src = images[index] || '';
            	if(src.replace(/\s/,'') == ''){
            		$(this).css("display","none");
            	}else{
            		$(this).show();
            		$(dom).find('img').attr('src', src);
            	}
            });

            $('#smalllist h2').html(data.small.title);
            $('#smalllist p').html(data.small.desc);
        });
$('#smalllist').on('click', 'li', function(e) {
	var self = $(this);
	if (self.hasClass(highClass)) {
		return;
	}
	self.siblings().removeClass(highClass);
	self.addClass(highClass);
	var url = self.find('img').attr('src');
	$('#detail').attr('src', url);
});
        //视频
        var video = document.getElementById('home-main-video-pc');
        video.src = '../images/video.mov';
        var dom = $('.videowrap').get(0);
        $(dom).click(function(){
        	if(video.paused){
        		video.play();
        	}else{
        		video.pause();
        	}
        });
        $('#main-video-play').click(function(e){
        	e.stopPropagation();
        	$('.video-wrap-fullscreen').css('visibility','visible');
        	$('.video-wrap-fullscreen').append(' <video id="big-video" class="img img-responsive" loop="loop" preload="auto" controls src="../images/video.webm"></video>');
        	var fullvideoHeight = parseInt($(window).height());
        	document.getElementById('big-video').play();
        	$('#big-video').css("height",fullvideoHeight+"px");
        	video.pause();
        })
        $('.video-close').click(function(){
        	$('.video-wrap-fullscreen').css('visibility','hidden');
        	document.getElementById('big-video').pause();
        	video.play();
        })
    }
    else{
    	$('html,body').css('overflow','auto');

        // 视频
        $('#video-title').on('click', 'img', function(e) {
        	e.stopPropagation();
        	$(this).hide();
        	$(this).siblings().show();
        	if ($(this).hasClass('play')) {
        		$('#home-main-video-tw').get(0).play();
        	} else {
        		$('#home-main-video-tw').get(0).pause();
        	}
        });

        // 视频
        $('#home-main-video-tw').on('play', function(event) {
        	$('#video-title .play').hide();
        	$('#video-title .pause').show();
        });
        // 视频
        $('#home-main-video-tw').on('pause', function(event) {
        	$('#video-title .play').show();
        	$('#video-title .pause').hide();
        });
        var iscrolllist = $('.iwrapper');

        $('.iscroll').each(function(index, dom) {
        	var self = $(dom),
        	childrens = self.find('div'),
        	item = childrens.eq(0),
        	mr = parseInt(item.css('margin-right')),
        	width;
        	width = childrens.length * (item.width() + mr) - mr;
        	self.width(width);
        });

        var menus = $('#menu span');
        $('#brand_tw .list').width($(window).width());
        var swipelength = $('#swipe .swipe-wrap').length;
        var mySwipe = new Swipe(document.getElementById('swipe'), {
        	speed: 400,
        	continuous: false,
        	disableScroll: false,
        	stopPropagation: false,
        	callback: function(index, elem) {
                // 设置菜单
                menus.removeClass('focus');
                menus.eq(index).addClass('focus');

                // 设置小菜单
                var sublist = iscrolllist.eq(index);
                sublist.siblings().hide();
                var status = sublist.data('status');
                sublist.show();
                if (!status && sublist.get(0)) {
                	var iscroll = bindIscroll(sublist.get(0));
                	sublist.data('iscroll', iscroll);
                	sublist.data('status', true);
                }

                // 箭头
                if (index === 0) {
                	$('#prev_tw').hide();
                } else {
                	$('#prev_tw').show();
                }
                if (index + 1 === swipelength) {
                	$('#next_tw').hide();
                } else {
                	$('#next_tw').show();
                }
            }
        });
$('#prev_tw').click(function() {
	mySwipe.prev();
});
$('#next_tw').click(function() {
	mySwipe.next();
});

function bindIscroll(dom) {
	return new IScroll(dom, {
		eventPassthrough: true,
		scrollX: true,
		scrollY: false,
		momentum: false,
		snapSpeed: 400,
		snap: 'div'
	});
}
        // 初始化
        bindIscroll(iscrolllist.eq(0).get(0));

        $('#menu').on('click', 'span', function(e) {
        	var index = $(this).index();
        	mySwipe.slide(index, 400);
        });

        // 点击小菜单，切换大图
        var swipeimglist = $('#swipe img');
        $('.iscroll').on('click', 'i', function() {
        	var self = $(this);
        	self.hide();
        	var parents = self.parent().siblings();
        	parents.each(function(index, el) {
        		$(el).find('i').show();
        	});
        	var index = $(this).parents('.iwrapper').index();
        	var img = new Image();
        	var url = self.siblings('img').attr('src');
        	img.onload = function() {
        		swipeimglist.eq(index).attr('src', url);
        	}
        	img.src = url;
        });
    }
    

   //图片延迟加载 
   // $(function() {
   // 	$("img").lazyload({
   // 		effect : "fadeIn"
   // 	});
   // });

});