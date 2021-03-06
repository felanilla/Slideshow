var utilities = require('./utilities');


var ANIMATION = {

    loadPage: () => {

        let main = document.getElementsByTagName('main'),
            nav = document.getElementsByTagName('nav'),
            load = document.getElementsByClassName("load"),
            icon = document.getElementsByClassName("nav-top__icon");
    
        let loaderTime = new TimelineMax({
            repeat: 2, 
            onComplete: loadScreen
        })
        let timeline = new TimelineMax()

        loaderTime
            .staggerFrom(load, .3, {
                scaleY: 0,
                transformOrigin: '0% 0%',
                ease: Back.easeOut
            }, .1)

            .staggerFrom(load, .5, {
                scaleY: 1,
                transformOrigin: '0% 100%',
                ease: Back.easeIn
            }, .1)

        function loadScreen() {

            timeline
            .to($(document.getElementsByClassName("loader-container")), .5, {
                autoAlpha: 0
            })
            .from(main, .4, {
                autoAlpha: 0
            } )
            .from(nav, 0.9, {
                x: -180,
                ease:Quad.easeInOut
            } )
            .from(icon, .1, {
                y: -20,
                autoAlpha: 0,
                ease:Quad.easeInOut
            } )
        }
    },

   changeSlideAnimation: () => {

        $('section').each( function(){
            $(this).prepend('<div class="bg-container"><div class="bg-image" style=\'background-image: '+ $(this).css('background-image') +';\'></div></div>');
        })
        
        TweenMax.set( 'section .bg-container' , { 
            y: -200, 
            rotate: .1 
        });
        TweenMax.set( 'h1' , { 
            y: 100,
            autoAlpha: 1 
        });
        TweenMax.set( '.hotspot' , {
            y: 150,
            autoAlpha: 0 
        });
        
        function moveToSlide(index) {
            let intoSection = $('section:nth-child('+index+')');
            var outSectionAbove = $( 'section:nth-child('+(index-1)+')' );
            var outSectionBelow = $( 'section:nth-child('+(index+1)+')' );    

            if( outSectionAbove.length ){
            TweenMax.to( outSectionAbove.find('.bg-container'), .25 , { y: 100, rotation: .1 } );
            TweenMax.to( outSectionAbove.find('h1') , .8, { y: -100, autoAlpha: 0 } );
            TweenMax.to( outSectionAbove.find('.hotspot') , .25, { y: -150, autoAlpha: 0 } );
            }
            
            if( outSectionBelow.length ){
            TweenMax.to( outSectionBelow.find('.bg-container'), .25 , { y: -100, rotation:.1 } );
            TweenMax.to( outSectionBelow.find('h1') , .8, { y: 100, autoAlpha: 0 }  );
            TweenMax.to( outSectionBelow.find('.hotspot') , .25, { y: 150, autoAlpha: 0 } );
            }
            
            TweenMax.to('.slides-container', 1 , { y: -$('.slides-container').height()*(index-1), rotation: 0, ease: Power2.easeOut } );
            TweenMax.to( intoSection.find('.bg-container'), 1 , { y: 0, rotation: 0 } );
            TweenMax.to( intoSection.find('h1') , .8, { y: 0, autoAlpha: 1, ease: Expo.ease } );
            TweenMax.staggerTo( intoSection.find('.hotspot') , .75, { y: 0, autoAlpha: 1, delay: .5 }, .125, function(){ isScrolling = false; } );
        }

        moveToSlide( 1 );
        var curSlide = 1;
        var isScrolling = false;

        $('.slides-container').on('mousewheel', (e) => {
            if( !isScrolling ){
                if( e.deltaY < -1 && curSlide < $('section').length ){ 
                    // Scroll Down   
                    moveToSlide( curSlide+1 );
                    curSlide++;
                    isScrolling = true;
                    changeNavContent();
                } else if( e.deltaY > 1 && curSlide > 1 ){ 
                    // Scroll Up
                    moveToSlide( curSlide-1 );
                    curSlide--;
                    isScrolling = true;
                    changeNavContent();
                }
            }   
        });

        document.addEventListener('keydown', (e) => {
            if (( e.keyCode == '39' || e.keyCode == '40' ) && curSlide < $('section').length ){ 
                moveToSlide( curSlide+1 );
                curSlide++;
                changeNavContent();
            } else if( ( e.keyCode == '37' || e.keyCode == '38' ) && curSlide > 1 ){
                moveToSlide( curSlide-1 );
                curSlide--;
                changeNavContent();
            }    
        }); 

        let arrowUp = document.getElementsByClassName('nav-bottom__arrow-up')[0],
            arrowDown = document.getElementsByClassName('nav-bottom__arrow-down')[0];


        arrowUp.addEventListener('click', (e) => {
            if( curSlide > 1 ){ 
                moveToSlide( curSlide-1 );
                curSlide--;
                changeNavContent();
            }
        });

        arrowDown.addEventListener('click', (e) => {
            if( curSlide < $('section').length ){ 
                moveToSlide( curSlide+1 );
                curSlide++;
                changeNavContent();
            }
        });

        function changeNavContent() {

            let slideCounter = document.getElementById('current-slide'),
                icon = document.getElementsByClassName('nav-top__icon')[0],
                line = document.getElementById('line');

            slideCounter.innerHTML = '0' + curSlide;

            if (curSlide == 1) {
                icon.style.backgroundImage = 'url(../img/icon-slide-1.png)';
            } else if (curSlide == 2) {
                icon.style.backgroundImage = 'url(../img/icon-slide-2.png)';
            } else if (curSlide == 3) {
                icon.style.backgroundImage = 'url(../img/icon-slide-3.png)';
            }

            let navTl = new TimelineMax();
            navTl
            .fromTo(slideCounter, .5, { x: -15, autoAlpha: 0}, { x: 0, autoAlpha: 1 }, 0)
            .from(line, .5 , {width: 0 }, 0)
            .from(line, .2 ,{  left: 35 }, .2)
        }
        
    },

    showAndHidePopup: () => {

        const hotspots = document.querySelectorAll('.hotspot');
        var playAnim = [];
        var reverseAnim = []

        for (var i = 0; i < hotspots.length; i++) {
            hotspots[i].addEventListener("click", showPopup);
            hotspots[i].addEventListener("mouseenter", on);
            hotspots[i].addEventListener("mouseleave", out);
        }

        function showPopup(e){
            e.stopPropagation();
            this.classList.add("active");
            var i = $(this).index();
            playAnim[i] = new TimelineMax();

            if(reverseAnim[i]) reverseAnim[i].kill();

            playAnim[i]
            .to($(this).find(".icon .group"), 0.2, { fill: "#fff", ease: Power3.easeIn, width: 150 }, 0 )
            .to($(this).find(".hotspot__circle"), 0.1, { autoAlpha: 0 }, 0 )
            .to($(this), 0.5, { width: 420, height: 140, borderRadius: 20, backgroundColor: "rgba(23, 23, 23, 0.75, .8)" } )
            .to($(this).find(".hotspot__copy"), 0.2, { autoAlpha: 1, ease: Power2.easeIn } )

            document.querySelector('body').addEventListener("click", hidePopup);
        }
            
        function hidePopup(e){
            e.stopPropagation();

            for(var i = 0; i < hotspots.length; i++) {
                if (playAnim[i]) playAnim[i].kill();
                if ($(hotspots[i]).hasClass('active')) {

                reverseAnim[i] = new TimelineMax();
                reverseAnim[i]
                .to($(this).find(".hotspot__copy"), 0.2, { autoAlpha: 0, ease: Power2.easeIn }, 0 )
                .to($(this).find(".icon .group"), 0.5, { fill: "#000", stroke: "transparent", ease: Power3.easeIn }, 0 )
                .to($(this).find(".active"), 0.5, { width: 120, height: 120, borderRadius: 100, backgroundColor: "rgba(255, 255, 255, 0.75)" } )
                .to($(this).find(".hotspot__circle"), 0.3, { autoAlpha: 1, scaleX: 1, scaleY: 1 } )

                $(".hotspot").removeClass("active");
                }
            }
        }

        function on(e){

            if (this.classList.contains("active")) {
                return
            } else {
                var onTl = new TimelineMax();
                onTl
                .to($(this), 0.5, { backgroundColor:"#fff" }, 0 )
                .to($(this).find(".hotspot__circle"), 0.5, { scaleX: 1.1, scaleY: 1.1 }, 0 )
            }
        }

        function out(e){

            if (this.classList.contains("active")) {
                return
            } else {
                var outTl = new TimelineMax();
                outTl
                .to($(this), 0.5, { backgroundColor:"rgba(255, 255, 255, 0.75)" } )
                .to($(this).find(".hotspot__circle"), 0.5, { scaleX: 1, scaleY: 1}, 0 )
            }
        }
    },

    init: function() {
        ANIMATION.loadPage();
        ANIMATION.changeSlideAnimation();
        ANIMATION.showAndHidePopup();
    },
};

module.exports = {
    init : ANIMATION.init
};