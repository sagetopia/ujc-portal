function updateViewportDimensions() {
  var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
  return { width:x,height:y };
}

var sliders = {};

(function($) {
  $.fn.lazyInterchange = function() {
    var selectors = this.each(function() {
      if ($(this).attr('data-lazy')) {
        $(this).attr('data-interchange', $(this).attr('data-lazy'));
        $(this).removeAttr('data-lazy').removeAttr('data-src').addClass('image-loaded');
        $(this).foundation('interchange', 'reflow');
      }
    });
    return selectors;
  };

  $(document).foundation({
  	'magellan-expedition': {
  		fixed_top: 20,
      offset_by_height: false,
  	},
  });

  $(document).ready(function() {

  	$("#introbutton a").click(function(e) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: $('#intro').offset().top
    	}, 1000);

      return false;
    });

    $('.icon-box a').click(function(e) {
      e.preventDefault();

      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
      }, 1000);

      return false;
    });

    $(".menu li a").click(function(e) {
      	$('.mobile input[type="checkbox"]').prop('checked', false);
    });


    if (Modernizr.mq('only all')) { 
      print_mq = window.matchMedia('print');
      print_mq.addListener(function(mql) {
        if (mql.matches) {
          $('.lazy').each(function() {
            $(this).lazyInterchange().css({opacity: 1});
          });
        }
      });
    } else {
      window.onbeforeprint = function() { 
        $('.lazy').each(function() {
          $(this).lazyInterchange().css({opacity: 1});
        });
      }
    }


    $('.slideshow').each(function(index, el) {
      var sliderId = this.id ? this.id : 'quotes-' + index;
      sliders[sliderId] = $(this).bxSlider({
        auto: false,
        autoDirection: this.id ? 'next' : 'prev',
        mode: 'horizontal',
        speed: 1000,
        pager: false,
        pause: this.id ? 4200 : 7000,
        maxSlides: 1,
        slideWidth: 775
      });
    });

    $('.slideshow-container').append('<div class="close-btn"><span /><span class="bottom" /></div>');

    $('.gallery .gallery-item img').on('click', function() {
      $(window).resize();
      var slider = sliders[$(this).closest('.section').find('.image-slideshow .slideshow')[0].id];
      slider.goToSlide($(this).closest('.gallery-item').data('index'));
      $(this).closest('.section').addClass('slideshow-open')
        .find('.image-slideshow').addClass('active').animate({ opacity: 1, 'z-index': 100 });
    });

    $('.slideshow-container .close-btn').on('click', function() {
      $(this).closest('.image-slideshow').animate({ opacity: 0 }, function() { 
        var $this = $(this);
        setTimeout(function() {
          $this.css({ 'z-index': '-1' }).removeClass('active').closest('.section').removeClass('slideshow-open');
        }, 200);
      });
    });

    $('.slideshow-wrap').on('click', function(e) {
      if (e.target === this) {
        $(this).closest('.image-slideshow').animate({ opacity: 0 }, function() { 
          var $this = $(this);
          setTimeout(function() {
            $this.css({ 'z-index': '-1' }).removeClass('active').closest('.section').removeClass('slideshow-open');
          }, 200);
        });
      }
    });

  });

  $(window).on('load', function() {

    $('html').removeClass("loading");

    if (typeof(document.getElementsByClassName) != 'undefined') {

      appear((function() {
        'use strict';
        var nodes = [];

        return {
          init: function init() {
            var els = document.getElementsByClassName('lazy');
            var elsl = els.length;
            for (var i = 0; i < elsl; i += 1) {
              nodes.push(els[i]);
            }
          },
          elements: nodes,
          appear: function doReveal(el) {
            $(el).lazyInterchange().animate({opacity: 1},500);
          },
          bounds: 600
        };
      }()));


      appear((function() {
        'use strict';
        var nodes = [];

        return {
          init: function init() {
            var els = document.getElementsByClassName('header-image');
            var elsl = els.length;
            for (var i = 0; i < elsl; i += 1) {
              if (els[i].hasAttribute('data-lazy')) {
                nodes.push(els[i]);
              }
            }
          },
          elements: nodes,
          appear: function doReveal(el) {
            var bg = 'url(' + cdnurl + '/assets/img/header/header_bg_' + el.getAttribute('data-lazy') + '.png)';
            el.style.backgroundImage = bg;
            el.removeAttribute('data-lazy');
          },
          bounds: 1000
        };
      }()));


    	if (updateViewportDimensions().width > 767) {
    	  var els = document.getElementsByClassName('parallax');

      	window.onscroll = function() {
    			Array.prototype.forEach.call(els, function(el) {
    				var rect = el.getBoundingClientRect();
    				if (rect.bottom > 0 && rect.top < updateViewportDimensions().height) {
    					el.style.backgroundPosition = 'center ' + (el.getBoundingClientRect().top * -0.15) + 'px';
    				}
    			});
      	};
    	}

    } else {
      $('.lazy').lazyInterchange().css({opacity: 1});
    }


    $(window).resize(function() {
      for (var slider in sliders) {
        if (updateViewportDimensions().width < 768) {
          sliders[slider].startAuto();
        } else {
          sliders[slider].stopAuto();
        }
      }
    }).resize();

  });

}(jQuery));
