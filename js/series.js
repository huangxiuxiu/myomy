$(function(){
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
		function showDetail(index){
			var _this = '.serie-plus_' + index;
			$(_this).on('click',function(){
				if($(this).text()=='+'){
					$(this).text('x');
					$(this).parent().siblings().show();
				}
				else if($(this).text()=='x'){
					$(this).text('+');
					$(this).parent().siblings().hide();
				}
			});
		}

        //fullpage
        $('#dowebok').fullpage({
        	afterLoad: function(anchorLink, index){
        		if(index>1&&index<7){
        			$(".masthead").fadeIn(10);
        		}else if(index==1){
        			$(".masthead").css("display","none");
        		}else if(index==7){
        			$(".masthead").css("display","none");
        		}
        		var _this = $(this);
        		addAnimate(_this,'.pull-left','.pull-right');
        		function addAnimate(page,target1,target2){
        			var _thisL = $(page).find(target1),
        			_thisR = $(page).find(target2),
        			_that = $(page).siblings().find('.serflag');
        			_thisL.animate({'marginTop':'25px'},"slow");
        			_thisR.animate({'marginTop':'90px'});
        			_that.animate({'marginTop':'50px'});
        		}
        	},
        });
        for(i = 1; i <= 8; i++){
        	showDetail(i);
        };
        //series' detail toggle
        
    }
    else{
    	$('html,body').css('overflow','auto');
    }
    
	//图片延时加载
	// $(function() {
	// 	$("img").lazyload({
	// 		effect : "fadeIn"
	// 	});
	// });

});