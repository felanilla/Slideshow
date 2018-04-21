var utilities = require('./utilities');


var ANIMATION = {

   changeSlideAnimation: function() {

        // Move background images to new elements and tween those element's Y
        $('section').each( function(){
            $(this).prepend('<div class="bg-container"><div class="bg-image" style=\'background-image: '+ $(this).css('background-image') +';\'></div></div>');
        })
        
        // Set all components to "from" position
        TweenMax.set( 'section .bg-container ' , { y: -200, rotate:.1 } );
        TweenMax.set( 'h2' , { y: 100, autoAlpha: 0 } );
        TweenMax.set( '.hotspot' , { y: 150, autoAlpha: 0 } );
        
        function moveToSlide( index ){
            var intoSection = $('section:nth-child('+index+')');
            var outSectionAbove = $( 'section:nth-child('+(index-1)+')' );
            var outSectionBelow = $( 'section:nth-child('+(index+1)+')' );    

            // flanking slides
            if( outSectionAbove.length ){
            TweenMax.to( outSectionAbove.find('.bg-container '), .25 , { y: 100, rotation: .1 } );
            TweenMax.to( outSectionAbove.find('h2') , .25, { y: -200, autoAlpha: 0 } );
            TweenMax.to( outSectionAbove.find('.hotspot') , .25, { y: -150, autoAlpha: 0 } );
            }
            
            if( outSectionBelow.length ){
            TweenMax.to( outSectionBelow.find('.bg-container '), .25 , { y: -100, rotation:.1 } );
            TweenMax.to( outSectionBelow.find('h2') , .25, { y: 200, autoAlpha: 0 } );
            TweenMax.to( outSectionBelow.find('.hotspot') , .25, { y: 150, autoAlpha: 0 } );
            }
            
            // Slide moving to
            TweenMax.to('.slides-container', 1 , { y: -$('.slides-container').height()*(index-1), rotation: 0, ease: Power2.easeOut } );
            TweenMax.to( intoSection.find('.bg-container '), 1 , { y: 0, rotation: 0 } );
            TweenMax.to( intoSection.find('h2') , .5, { y: 0, autoAlpha: 1 } );
            TweenMax.staggerTo( intoSection.find('.hotspot') , .75, { y: 0, autoAlpha: 1, delay: .5 }, .125, function(){ isScrolling = false; } );
        
        }
        
        moveToSlide( 1 );
        var curSlide = 1;
        var isScrolling = false;
        
        $('.slides-container').on('mousewheel', function(e) {
            if( !isScrolling ){
            if( e.deltaY < -1 && curSlide < $('section').length ){ // Scroll Down   
                moveToSlide( curSlide+1 );
                curSlide++;
                isScrolling = true;
            }else if( e.deltaY > 1 && curSlide > 1 ){ // Scroll Up
                moveToSlide( curSlide-1 );
                curSlide--;
                isScrolling = true;
            }
            }
        });
        
        
        $(document).on( 'keydown' , function(e){
            if( ( e.keyCode == '39' || e.keyCode == '40' ) && curSlide < $('section').length ){ // Scroll down
            moveToSlide( curSlide+1 );
            curSlide++;
            }else if( ( e.keyCode == '37' || e.keyCode == '38' ) && curSlide > 1 ){ // Scroll Up
            moveToSlide( curSlide-1 );
            curSlide--;
            }     
        });


    },

    init: function() {
        ANIMATION.changeSlideAnimation();
    },
};

module.exports = {
    init : ANIMATION.init
};