$(function(){
	var video=document.getElementById("my_video");
	var videoList=["videos/video0.mp4",
					"videos/video1.mp4",
					"videos/video2.mp4",
					];
	var total=videoList.length-1;
	var n= 0;
	var pageN=1;
	var svgOffset=[21 ,49, 77];
	var videoPath="";
	video.muted=true;
	video.play();

	function pagination(){
		$("#header .controller .pagination span").text(pageN +"/"+(total+1));
	}
	pagination();
	function videoPlay(){
		video.pause();
		videoPath = "video/"+videoList[n]+".mp4";
		video.setAttribute("src",videoPath);
		$("#my_video").hide().css({opacity:0});
		video.play();

		setTimeout(function(){
			$("#my_video").show().animate({opacity:1},300)
		},500);
	}
	video.addEventListener("ended", function(){
		if(n < total){
			n=n+1;
		}
		else{
			n=0;
		}

		$("#my_video").attr({src:videoList[n]});
		video.play();
		pageN= n+1;
		pagination();
	});
	$("#header .main_txt .controller .btn .next").click(function(e){
		e.preventDefault();
		if(n < total){
			n=n+1;
		}
		else{
			n=0;
		}
		$("#my_video").attr({src:videoList[n]});
		video.play();
		pageN= n+1;
		pagination();
	});
	$("#header .main_txt .controller .btn .prev").click(function(e){
		e.preventDefault();
		if(n > 0){
			n=n-1;
		}
		else{
			n=total;
		}
		$("#my_video").attr({src:videoList[n]});
		video.play();
		pageN= n+1;
		pagination();
	});




	var windowH;
	var categoryFlag=false;
	var body= document.querySelector("body");

	$(window).resize(function(){
		clearTimeout(timer);
		w=window.innerWidth;
		winHalf=$(window).height()/2;
		windowH=$(window).height();
		pos=sectionN*windowH;
		$("html").stop().animate({scrollTop:pos},800)
	
	
		if(w > 720 && $("#m_gnb").hasClass("active")){
			$("#m_gnb").removeClass("active");
			$("#header .tab").removeClass("active");
		}
		if(w<720){
			body.style.overflowY="visible";
		}
		else body.style.overflowY="hidden";
	});
	$(window).trigger("resize");
	
	var scrollT=0;

	$(window).scroll(function(){
		clearTimeout(timer);
		timer =setTimeout(function(){
		},100);
		
		scrollT=$(window).scrollTop();
		if(scrollT<$("#page1").offset().top-winHalf) sectionN=0;
		else if(scrollT<$("#page2").offset().top-winHalf) sectionN=1;
		else if(scrollT<$("#page3").offset().top-winHalf) sectionN=2;
		else if(scrollT<$("#page4").offset().top-winHalf) sectionN=3;
		else if(scrollT<$("#page5").offset().top-winHalf) sectionN=4;
		else sectionN=5;


		if( scrollT>100){
			$("#header .top").addClass("fixed") ;
		}
		else{
			$("#header .top").removeClass("fixed");
		}

		if(categoryFlag) return;
		else{
			if(sectionN==0){
				$("#header").addClass("active");
			}else{
				$("#page"+sectionN).addClass("active");
				if(sectionN==5){
					categoryFlag==true;
				}
			}
		}

	});
	var sectionN=0;
	var windowH;
	var pos=0;
	var timer=0;

	function init(){
		$("#header").addClass("active");
		$("#gnb li").eq(sectionN).addClass("active");
		
	}
	init();
	function pageInterface(){
		$("html").stop().animate({scrollTop:pos},800,function(){
			$(".wrapper > *").removeClass("active");
			$(".wrapper > *").eq(sectionN).addClass("active");
			$("#gnb li").removeClass("active");
			$("#gnb li").eq(sectionN).addClass("active");
		})
	}

	$(".wrapper").mousewheel(function(e, delta){
		if($("html").is(":animated"))return;
		if(w<720) return;

		if(delta > 0){
			if(sectionN > 0){
				sectionN=sectionN-1;
			}
		}else{
			if(sectionN < 5){
				sectionN=sectionN+1;
			}
		}

		pos=sectionN*windowH;
		pageInterface();
	});

	var path=0;
	$(".tab").click(function(e){
		e.preventDefault();
		$(".tab").toggleClass("active");
		$("#m_gnb").toggleClass("active");
		$("body").toggleClass("fixed"); 
	});

	$("#gnb li").click(function(e){
		e.preventDefault();
		sectionN =$(this).index();
		pos=sectionN*windowH;
		pageInterface();
	})
    $("#m_gnb li").click(function(e){
        e.preventDefault();
		sectionN=$(this).index();
		pos=sectionN*windowH;
		path=$(this).find("a").attr("href");

		if(w>720) pageInterface();
		else $("html").animate({scrollTop:$(path).offset().top}, 800);

        $("#m_gnb").removeClass("active");
		$("body").removeClass("fixed");
		$("#header .tab").removeClass("active");
		
    });


});