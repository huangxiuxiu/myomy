(function() {
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
        var animateStatus = true;
        function setImagewrapWidth() {
            var imgwrap = $('.imgwrap'),
                imglist_width = $('.imglist').first().width(),
                imglist = imgwrap.find('img');
            imglist.css('width', imglist_width);
            imgwrap.each(function(i, dom) {
                var self = $(dom);
                self.css('width', self.find('img').length * imglist_width);
            });
            var window_height = $(window).height(),
                map_height = window_height-84-70-32-47*2;// 84是上面顶部的高度 + padding
                map_width = map_height * 1192 / 654;
            // 设置相册大小
            $('.imglist').height(window_height-54);
            $('.storelist').height(window_height-54-2);
            // 设置地图大小
            // $('#mapcontent').css({
            //     width: map_width,
            //     height: map_height
            // }); 
        }

        setImagewrapWidth();

        // 设置图片宽度
        $(window).resize(function() {
            setImagewrapWidth();
        });

        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            console.log(scrollTop);
            if(scrollTop >= 84+70+32){
                $('.mainnav').css({top:"0px"});
            }else{
                $('.mainnav').css({top:"-82px"});
            }
        });

        // $('.storelist').on('click', 'li', function() {
        //     if (animateStatus === false) {
        //         return;
        //     }
        //     var index = $(this).index(),
        //         imgwrap = $(this).parents('.storelist').siblings('.imglist').children('.imgwrap'),
        //         imglist_width = $('.imglist').first().width(),
        //         animateStatus = false;
        //     imgwrap.animate({
        //             'margin-left': -index * imglist_width,
        //         },
        //         300,
        //         function() {
        //             animateStatus = true;
        //         }
        //     );
        // });
        var anchors = [];
        $('.store') .each(function(i,dom){
            var id = $(this).attr('id');
            anchors.push(id);
        });
    }
    else{
        $('html,body').css('overflow','auto');

        $(window).scroll(function(event) {
            var scrollTop = $(window).scrollTop(),
                window_height = $(window).height();
            $('.lazyload').each(function(index, dom) {
                var offsetTop = $(dom).offset().top,
                    image,
                    url = $(dom).data('src');
                if (offsetTop >= scrollTop && offsetTop <= scrollTop + window_height) {
                    var image = new Image();
                    image.onload = function() {
                        $(dom).removeClass('lazyload');
                        $(dom).attr('src', url);
                    }
                    image.src = url;
                }
            })
        });
    }
    
})();