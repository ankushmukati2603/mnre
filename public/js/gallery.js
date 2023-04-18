
$(document).ready(function(){
    $(".fancybox").fancybox({
          openEffect: "none",
          closeEffect: "none"
      });
      
      $(".zoom").hover(function(){
          
          $(this).addClass('transition');
      }, function(){
          
          $(this).removeClass('transition');
      });
  });
  $('[data-fancybox="images"]').fancybox({
    buttons : [
      'share',
      'download',
      'thumbs',
      'close'
    ],
  });
  
/* Sticky Header */

$.fn.followTo = function (pos) {
  var $this = this,
      $window = $(window);

  $window.scroll(function (e) {
      if ($window.scrollTop() > pos) {
          $this.css({
              position: 'absolute',
          });
      } else {
          $this.css({
              position: 'fixed',
          });
      }
  });
};
$('.related').followTo(3300);
$('.timeline-year').on('click', function(){
    $('.timeline-year').removeClass('selected');
    $(this).addClass('selected');
});

window.onload = function() {
  var currIEZoom = 100;
  $('.increase').on('click', function() {
    if(currIEZoom >= 125){
      alert('Cannot Increase Scale beyont this.')
    } else {
      var step = 2;
      currIEZoom += step;
      $('body').css('zoom', ' ' + currIEZoom + '%');
    }
    
  });

  $('.decrease').on('click', function() {
    if(currIEZoom == 100){
      alert('Cannot Decrease Scale beyond this')
    } else {
      var step = 2;
      currIEZoom -= step;
      $('body').css('zoom', ' ' + currIEZoom + '%');
    }
      
 
  });

  $('.resetMe').on('click', function() {
    
      currIEZoom = 100;
      $('body').css('zoom', ' ' + currIEZoom + '%');

  });
};

// $(document).ready(function(){        
//     var originalSize = $('div').css('font-size');
//     var i = 3;        
//    // reset        
//     $(".resetMe").click(function(){           
//    $('div').css('font-size', originalSize);         
//     });
   
    
//     // Increase Font Size   
//     $(".increase").click(function(){ 
//       for (i>=5; i <= 15; i += 15){
//         i++
//         var b = $("div").css({"font-size": i }) + 2;
//             }  
//             $('div').css('font-size', i);         
//     return false; 
//    });        
   
//     // Decrease Font Size       
//     $(".decrease").click(function(){        
//     var currentFontSize = $('div').css('font-size');        
//     var currentSize = $('div').css('font-size');        
//     var currentSize = parseFloat(currentSize)*0.8;        
//     $('div').css('font-size', currentSize);         
//     return false;         
//     });         
//   });

  $("#carousel").owlCarousel({
    autoplay: true,
    lazyLoad: true,
    loop: true,
    margin: 20,
     /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
    responsiveClass: true,
    autoHeight: true,
    smartSpeed: 10000,
    nav: true,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
  
      600: {
        items: 2
      },
  
      1024: {
        items: 3
      },
  
      1366: {
        items: 4
      }
    }
  });
   

  $(document).ready(function() {
    $(".drop .option").click(function() {
      var val = $(this).attr("data-value"),
          $drop = $(".drop"),
          prevActive = $(".drop .option.active").attr("data-value"),
          options = $(".drop .option").length;
      $drop.find(".option.active").addClass("mini-hack");
      $drop.toggleClass("visible");
      $drop.removeClass("withBG");
      $(this).css("top");
      $drop.toggleClass("opacity");
      $(".mini-hack").removeClass("mini-hack");
      if ($drop.hasClass("visible")) {
        setTimeout(function() {
          $drop.addClass("withBG");
        }, 400 + options*100); 
      }
      triggerAnimation();
      if (val !== "placeholder" || prevActive === "placeholder") {
        $(".drop .option").removeClass("active");
        $(this).addClass("active");
      };
    });
    
    function triggerAnimation() {
      var finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
      $(".drop").css("width", "24em");
      setTimeout(function() {
        $(".drop").css("width", finalWidth + "em");
      }, 400);
    }
  });

//   $(document).ready(function(){   
//     $(".decrease").click(function(){  
//   $('html *:not(script, style, noscript)').each(function() {
//     $(this).css("background", "none");
//     $(this).css("background-color", "yellow");
//     $(this).css("color", "black");
//     $(this).css("box-shadow", "none");
//     $(this).css("text-shadow", "none");
//   });
// });

  

  
  