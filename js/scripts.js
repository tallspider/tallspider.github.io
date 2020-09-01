/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    let cursorStatuses = new Map();   // for each element id: 1 for force on, 0 for flash, -1 for force off
    
    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {
        e.preventDefault();
        
        addLetterForTab(0, e.target.textContent);
        setTimeout(function(){ cursorStatuses.set('console_line', -1);}, 200);  // turn off flashing cursor

        setTimeout(function(){
            // Treat as normal link if no-scroll class
            if (e.target.classList.contains('no-scroll')) return;

            var heading = e.target.getAttribute('value');
            var scrollDistance = $(heading).offset().top;

            $('html, body').animate({
                scrollTop: scrollDistance + 'px'
            }, Math.abs(window.pageYOffset - $(heading).offset().top) / 2.5);

            // Hide the menu once clicked if mobile
            if ($('header').hasClass('active')) {
                $('header, body').removeClass('active');
            }

            setTimeout(function(){
                document.getElementById('console_line').textContent = '> ';
                cursorStatuses.set('console_line', 0);
                consoleLine('console_line');
            }, 500);

        }, 1000);
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#about').offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    function addLetter(i){
        const NAME = "ANNIE GAO";
        if(i >= NAME.length){ 
            document.getElementById('name_h1').textContent = '> ' + NAME;
            document.getElementById('lead_program_h2').textContent = 'Computer Engineering @ UofT';
            document.getElementById('console_line').textContent = '> ';
            consoleLine('console_line');
            return;
        }

        document.getElementById('name').textContent += NAME.charAt(i);
        setTimeout(function(){ addLetter(i + 1) }, 200);
    }
    
    function addLetterForTab(i, str){
        if(i > str.length){
            return;
        }
        let currStr = document.getElementById('console_line').textContent;
        document.getElementById('console_line').textContent = 
            currStr.substring(0, i + 2) + 
            str.charAt(i) + 
            currStr.substring(i + 2, currStr.length);

        setTimeout(function(){ addLetterForTab(i + 1, str) }, 80);
    }

    function consoleLine(elemId){ 
        let cursorStatus = cursorStatuses.get(elemId);
        if(!cursorStatus){
            cursorStatuses.set(elemId, 0);
            cursorStatus = 0;
        }
        let old_str = document.getElementById(elemId).textContent;

        if(cursorStatus == 1){  // force on
            if(old_str.charAt(old_str.length - 1) != '_'){
                document.getElementById(elemId).textContent += '_';
            }
        }

        if(cursorStatus == 0){  // flash
            if(old_str.charAt(old_str.length - 1) == '_'){
                document.getElementById(elemId).textContent = old_str.substring(0, old_str.length - 1);
                setTimeout(function(){ consoleLine(elemId); }, 300);
            } else {
                document.getElementById(elemId).textContent += '_';
                setTimeout(function(){ consoleLine(elemId); }, 500);
            }
        }

        if(cursorStatus == -1){ // force off
            if(old_str.charAt(old_str.length - 1) == '_'){
                document.getElementById(elemId).textContent = old_str.substring(0, old_str.length - 1);
            }
        }
        
    }

    $(document).ready(function(){
        cursorStatuses.set("console_line", 0);
        addLetter(0);
    });

})(jQuery);
