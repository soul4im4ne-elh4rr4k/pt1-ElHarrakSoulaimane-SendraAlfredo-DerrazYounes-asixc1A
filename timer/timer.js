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

// Timer
    const hrSpan = document.querySelector(".hour");
    const minSpan = document.querySelector(".minute");
    const secSpan = document.querySelector(".second");
    const msecSpan = document.querySelector(".millisecond");
    const startStopwatch = document.querySelector(".startStopwatch");
    const startPauseIcon = document.querySelector(".starticon");
    const lapStopwatch = document.querySelector(".lapStopwatch");
    const output = document.querySelector(".output");

    let time = 0;

    let msec = 0;
    let sec = 0;
    let min = 0;
    let hr = 0;

    let msecDisplay = String(msec).padStart(2, 0);
    let secDisplay = String(sec).padStart(2, 0);
    let minDisplay = String(min).padStart(2, 0);
    let hrDisplay = String(hr).padStart(2, 0);

    msecSpan.textContent = msecDisplay;
    secSpan.textContent = secDisplay;
    minSpan.textContent = minDisplay;
    hrSpan.textContent = hrDisplay;

    let startPause = true;

    let interval;

    function intervalFunction() {
    if (startPause) {
        lapStopwatch.classList.remove('red');
        lapStopwatch.innerHTML = 'lap';

        startPauseIcon.classList.remove("fa-play");
        startPauseIcon.classList.add("fa-pause");

        startPause = !startPause;

        // console.log("Interval Running");
        interval = setInterval(startStopwatchTimer, 10);

        function startStopwatchTimer() {
        msec++;
        // console.log(msec);

        msecDisplay = String(msec).padStart(2, 0);
        secDisplay = String(sec).padStart(2, 0);
        minDisplay = String(min).padStart(2, 0);
        hrDisplay = String(hr).padStart(2, 0);

        if (msec < 100) {
            msecSpan.textContent = msecDisplay;
        }
        secSpan.textContent = secDisplay;
        minSpan.textContent = minDisplay;
        hrSpan.textContent = hrDisplay;


        if (msec == 100) {
            msec = 0;
            sec++;
        }
        if (sec == 60) {
            sec = 0;
            min++;
        }
        if (min == 60) {
            min = 0;
            hr++;
        }
        }
    } else {
        lapStopwatch.innerHTML = '<i class="fa-solid fa-arrow-rotate-left">';
        lapStopwatch.classList.add('red');

        startPauseIcon.classList.remove("fa-pause");
        startPauseIcon.classList.add("fa-play");

        clearInterval(interval);

        // console.log("Interval Paused");
        startPause = !startPause;
    }
    }



    // const lapIcon = document.querySelector('.lapIcon');

    function outputLap() {

    if (!startPause) {
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `${hrDisplay}:${minDisplay}:${secDisplay},${msecDisplay}`;
        output.appendChild(lapDiv);
    } else {

        msec = 0;
        sec = 0;
        min = 0;
        hr = 0;

        msecSpan.textContent = String(msec).padStart(2, 0);
        secSpan.textContent = String(sec).padStart(2, 0);
        minSpan.textContent = String(min).padStart(2, 0);
        hrSpan.textContent = String(hr).padStart(2, 0);
        output.innerHTML = '';
    }
    }

    lapStopwatch.addEventListener("click", outputLap);
    startStopwatch.addEventListener("click", intervalFunction);