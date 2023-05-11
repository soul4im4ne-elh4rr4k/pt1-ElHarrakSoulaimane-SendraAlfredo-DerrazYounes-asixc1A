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

// Alarm
var modeFlag = true,
		alarmSetFlag = false,
	alarmData = {
	hrs: 0,
	mins: 0,
	alarmSet: false,
			pm: false
	};

// Functions
// display clock data
function display(hrs, mins) {
	console.log(alarmData);
	console.log('hrs = ' + hrs + ' / mins = ' + mins);
	if(alarmData.alarmSet && hrs === alarmData.hrs && mins === alarmData.mins) {
		alarmActive();
	}
	if (!modeFlag) {
		hrs = ampm(hrs);
	}
	hrs = zeroPrefixer(hrs);
	mins = zeroPrefixer(mins);
	$('.hrs').text(hrs);
	$('.mins').text(mins);
}

// Alarm trigger
function alarmActive() {
	$('.nums').addClass('alarm-flash');
	$('.alarm-display').text('alarm!');
}

// am pm mode function
function ampm(hour) {
	if (hour > 12) {
		alarmData.pm = true;
		$('.ampm-display').text('pm');
		return hour - 12;
	} else {
		alarmData.pm = false;
		$('.ampm-display').text('am');
		return hour;
	}
}

// Function to prefix a zero if less than ten
function zeroPrefixer(num) {
return (num < 10 ? '0' : '') + num;
}

// get javascript time data
function setClock() {
	if(!alarmSetFlag){
		var hrs = new Date().getHours(),
				mins = new Date().getMinutes();
		display(hrs, mins);
	}
}

// record current time
function currentTime() {
alarmData.hrs = Number($('.hrs').text());
alarmData.mins = Number($('.mins').text());
	if (alarmData.pm && !modeFlag) {
		alarmData.hrs = alarmData.hrs + 12;
	}
}

// update values after clicking on controls
function alarmControl(val, sym) {
sym === '+' ? alarmData[val]++ : alarmData[val]--;
alarmLimiter(val);
}

// dont allow above or below 24hrs or 60 secs
function alarmLimiter(val) {
if (val === 'mins' && alarmData.mins > 59) {
	alarmData.mins -= 60;
} else if (val === 'mins' && alarmData.mins < 0) {
	alarmData.mins += 60;
} else if (val === 'hrs' && alarmData.hrs > 23) {
	alarmData.hrs -= 24;
} else if (val === 'hrs' && alarmData.hrs < 0) {
	alarmData.hrs += 24;
}
display(alarmData.hrs, alarmData.mins);
}

function setAlarm(toSet, text) {
	var $a = $('.alarm-display')
	alarmData.alarmSet = toSet;
	$('.alarm').text(text);
	toSet ? $a.text('alarm set for ' + alarmData.hrs + ':' + zeroPrefixer(alarmData.mins)) : $a.text('no alarm set');
}

// Set interval timer that checks every second.
setInterval(setClock, 1000);

// Click events
$('.mode').click(function() {
	modeFlag ? $('.mode-display').text('am/pm clock') : $('.mode-display').text('24hr clock');
	$('.ampm-display').toggleClass('handle');
	modeFlag = !modeFlag;
});

$('.alarm').click(function() {
	if (alarmData.alarmSet) {
		$('.nums').removeClass('alarm-flash');
		setAlarm(false, 'set alarm');
	} else {
		$('ul').toggleClass('handle');
		$('.nums').toggleClass('flash');
		alarmSetFlag ? setAlarm(true, 'cancel alarm') : currentTime();
		alarmSetFlag = !alarmSetFlag;
	}
});

$('.control-hrs li').each(function() {
$(this).click(function(){
	alarmControl('hrs', $(this).text());
});
});

$('.control-mins li').each(function() {
$(this).click(function(){
	alarmControl('mins', $(this).text());
});
});