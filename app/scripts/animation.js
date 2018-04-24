var utilities = require('./utilities');


var ANIMATION = {

   changeSlideAnimation: function() {

        $('section').each( function(){
            $(this).prepend('<div class="bg-container"><div class="bg" style=\'background-image: '+ $(this).css('background-image') +';\'></div></div>');
        })
        
        TweenMax.set( 'section .bg-container' , { y: -200, rotate:.1 } );
        TweenMax.set( 'h1' , { y: 100, autoAlpha: 1 } );
        TweenMax.set( '.hotspot' , { y: 150, autoAlpha: 0 } );
        
        function moveToSlide( index ){
            var intoSection = $('section:nth-child('+index+')');
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
    
        $(document).on( 'keydown' , function(e){
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

        $('.nav-bottom__arrow-up').on( 'click' , function(e){
            if( curSlide > 1 ){ 
                moveToSlide( curSlide-1 );
                curSlide--;
                changeNavContent();
            }
        });

        $('.nav-bottom__arrow-down').on( 'click' , function(e){
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

        $(".hotspot").hover(over, out);
        TweenMax.set(".popup", { autoAlpha: 0 } );

        function over(){
            var overTl = new TimelineMax();
            overTl
            .to($(this).find(".icon .group"), 0.3, { fill: "#fff", ease: Power3.easeIn } )
            .to($(this).find(".popup"), 0.3, { autoAlpha: 1, ease: Power4.easeIn } )
            .fromTo($(this).find(".copy"), 0.3, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1 } )
        }
            
        function out(){
            var outTl = new TimelineMax();
            outTl
            .to($(this).find(".copy"), 0.3, { y: 20, autoAlpha: 0 } )
            .to($(this).find(".icon .group"), 0.3, { fill: "#000", stroke: "transparent", ease: Power3.easeIn } )
            .to($(this).find(".popup"), 0.3, { autoAlpha: 0, ease: Power4.easeIn } )
        }
    },

    init: function() {
        ANIMATION.changeSlideAnimation();
        ANIMATION.showAndHidePopup();
    },
};

module.exports = {
    init : ANIMATION.init
};