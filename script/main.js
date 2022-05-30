$(function(){
	let body= document.querySelector("body");
	let video=document.getElementById("my_video");
	let videoList=["videos/video0.mp4",
					"videos/video1.mp4",
					"videos/video2.mp4",
					];
	let total=videoList.length-1;
	let n= 0;
	let windowH;
	let categoryFlag=false;
	let sectionN=0;
	let pos=0;
	let timer=0;
	let path=0;
	let scrollT=0;
	video.muted=true;
	video.play();
	video.setAttribute("playsinline","");
	video.setAttribute("autoplay","");

	function init(){
		$("#header").addClass("active");
		$("#gnb li").eq(sectionN).addClass("active");
	}
	init();

	function pagination(){
		$("#header .controller .pagination span").text((n+1) +"/"+(total+1));
	}
	pagination();
	function videoPlay(){
		video.setAttribute("id", "my_video");
    video.setAttribute("src", videoList[n]);
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    video.oncanplaythrough =function(){
      video.play();
    }
		$("#my_video").hide().css({opacity:0});

		setTimeout(function(){
			$("#my_video").show().animate({opacity:1},300)
		},500);
	}
	
	video.addEventListener("ended",()=>{
		if(n < total){
			n=n+1;
		}
		else{
			n=0;
		}

		videoPlay();
		pagination();
	});
	$("#header .main_txt .controller .btn .next").click(e=>{
		e.preventDefault();
		if(n > 0){
			n=n-1;
		}
		else{
			n=total;
		}
		videoPlay();
		pagination();
	});
	$("#header .main_txt .controller .btn .prev").click(e=>{
		e.preventDefault();
		if(n < total){
			n=n+1;
		}
		else{
			n=0;
		}
		videoPlay();
		pagination();
	});

	$(window).resize(()=>{
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

	$(window).scroll(()=>{
		clearTimeout(timer);
		timer =setTimeout(()=>{
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

	function pageInterface(){
		$("html").stop().animate({scrollTop:pos},800,()=>{
			$(".wrapper > *").removeClass("active");
			$(".wrapper > *").eq(sectionN).addClass("active");
			$("#gnb li").removeClass("active");
			$("#gnb li").eq(sectionN).addClass("active");
		})
	}

	$(".wrapper").mousewheel((e, delta) =>{
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

	$(".tab").click(e=>{
		e.preventDefault();
		$(".tab").toggleClass("active");
		$("#m_gnb").toggleClass("active");
		$("body").toggleClass("fixed"); 
	});

	$("#gnb li").click(e=>{
		e.preventDefault();
		sectionN =$(this).index();
		pos=sectionN*windowH;
		pageInterface();
	})

	$("#m_gnb li").click(e=>{
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