// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});
$(document).ready(function() {
	var url = window.location.href;
	$('nav a[href="'+url+'"]').addClass('active');
});
// Dark mode
window.onload = function(){
	const darkModeBtn = document.getElementById("dark-mode-switch");
	let isDarkMode = false;
	
	darkModeBtn.addEventListener("click", function() {
	if (isDarkMode) {
		document.body.classList.remove("dark-mode");
		document.body.classList.add("light-mode");
	} else {
		document.body.classList.remove("light-mode");
		document.body.classList.add("dark-mode");
	}
	isDarkMode = !isDarkMode;
	darkModeBtn.classList.add("rotate");
	setTimeout(function() {
		darkModeBtn.classList.remove("rotate");
	}, 200);
	});
};

// Super Header //
window.onload = function(){
    const left = document.getElementById("left-side");

    const handleMove = e => {
      left.style.width = `${e.clientX / window.innerWidth * 100}%`;
    }
    
    document.onmousemove = e => handleMove(e);
    
    document.ontouchmove = e => handleMove(e.touches[0]);
};