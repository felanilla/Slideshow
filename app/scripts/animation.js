var utilities = require('./utilities');


var ANIMATION = {

    loadPage: function() {

        let main = document.getElementsByTagName('main'),
            nav = document.getElementsByTagName('nav'),
            load = document.getElementsByClassName("load"),
            icon = document.getElementsByClassName("nav-top__icon");
    
        let loaderTime = new TimelineMax({repeat: 2, onComplete: loadScreen})
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
            .from(main, .5, {
                autoAlpha: 0
            } )
            .from(nav, 1, {
                x: -200,
                ease:Quad.easeInOut
            } )
            .from(icon, .1, {
                y: -20,
                autoAlpha: 0,
                ease:Quad.easeInOut
            } )
        }
    },

   changeSlideAnimation: function() {

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
        
        function moveToSlide( index ){
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

        $('.slides-container').on('mousewheel', function(e) {
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

        document.addEventListener('keydown', function(e) {
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


        arrowUp.addEventListener('click', function(e) {
            if( curSlide > 1 ){ 
                moveToSlide( curSlide-1 );
                curSlide--;
                changeNavContent();
            }
        });

        arrowDown.addEventListener('click', function(e) {
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

    showAndHidePopup: function() {
        
        
        $(".hotspot").click(showPopup);
        $(".hotspot:not(.active)").hover(on, out);
        TweenMax.set(".popup", { autoAlpha: 0 } );

        function showPopup(e){
            e.stopPropagation();
            $(this).addClass("active");

            var showTl = new TimelineMax();

            if( $(this).hasClass("hotspot--up") ){
                showTl.to( $(this) , 0.4 , { y: -40, ease: Power1.easeIn } )
            }
            if( $(this).hasClass("hotspot--down") ){
                showTl.to( $(this) , 0.4, { y: 40, ease: Power1.easeIn } )
            }
            if( $(this).hasClass("hotspot--left") ){
                showTl.to( $(this) , 0.4 , { x: -40, ease: Power1.easeIn } )
            }
            if( $(this).hasClass("hotspot--right") ){
                showTl.to( $(this) , 0.4, { x: 40, ease: Power1.easeIn } )
            }
            showTl.to($(this).find(".hotspot__hotspot-inner"), 0.2, { scaleX: 1.1, scaleY: 1.1, autoAlpha: 0 }, 0 )
            showTl.to($(this).find(".icon .group"), 0.2, { fill: "#fff", ease: Power3.easeIn } )
            showTl.to($(this).find(".popup"), 0.2, { autoAlpha: 1, ease: Power4.easeIn } )
            showTl.fromTo($(this).find(".copy"), 0.2, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 } )

            $("body").click(hidePopup);
        }
            
        function hidePopup(e){
            e.stopPropagation();
            var hideTl = new TimelineMax();

            hideTl
            .to($(this).find(".copy"), 0.2, { y: 20, autoAlpha: 0 } )
            .to($(this).find(".icon .group"), 0.2, { fill: "#000", stroke: "transparent", ease: Power3.easeIn } )
            .to($(this).find(".popup"), 0.2, { autoAlpha: 0, ease: Power4.easeIn } )
            if( $(".active").hasClass("hotspot--up") ) {
                hideTl.to( $(".active") , 0.4 , { y: 20, ease: Power1.easeIn } )
            }
            if( $(".active").hasClass("hotspot--down") ){
                hideTl.to( $(".active") , 0.4, { y: -20, ease: Power1.easeIn } )
            }
            if( $(".active").hasClass("hotspot--left") ){
                hideTl.to( $(".active") , 0.4 , { x: 20, ease: Power1.easeIn } )
            }
            if( $(".active").hasClass("hotspot--right") ){
                hideTl.to( $(".active") , 0.4, { x: -20, ease: Power1.easeIn } )
            }
            hideTl.to($(this).find(".hotspot__hotspot-inner"), 0.2, { autoAlpha: 1 }, "+=.2" )

            $(".hotspot").removeClass("active")
        }

        function on(e){
            var onTl = new TimelineMax();
            onTl.to($(this), 0.5, { backgroundColor:"#fff" }, 0 )
            onTl.to($(this).find(".hotspot__hotspot-inner"), 0.4, { scaleX: 1.1, scaleY: 1.1 }, 0 )
        }

        function out(e){
            var outTl = new TimelineMax();

            outTl.to($(this), 0.5, { backgroundColor:"rgba(255, 255, 255, 0.75)" } )
            outTl.to($(this).find(".hotspot__hotspot-inner"), 0.4, { scaleX: 1, scaleY: 1}, 0 )
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