$(document).ready(function () {

  //reveals
  $('.wos-reveal').each(function() {
    var $controls = $('.wos-reveal__controls',this);
    var $items = $('.wos-reveal__items',this);
    
    $('a', $controls).click(function(e) {
      e.preventDefault();

      if(! $(this).hasClass('active')) { //if this isn't currently active

        var targetItem = $(this).attr('data-reveal-target');

        //change active state on controls
        $('a', $controls).removeClass('active');
        $(this).addClass('active');

        //change active items
        $items.removeClass(function(index,className) {
          return (className.match(/(^|\s)active-\S+/g) || []).join(' ');
        });
        $items.addClass(targetItem);

      }

    });

  });


  //accordion
  $('.wos-accordion').each(function() {
    $thisAccordion = this;
    $('.wos-accordion__title', $thisAccordion).click(function() {
      $('.wos-accordion__item', $thisAccordion).each(function() {
        $(this).removeClass('show');
      });
      var $thisWrapper = $(this).closest('.wos-accordion__item').addClass('show');
    });
  });

  //fitvid
  $('iframe[src*="youtube"]').parent().fitVids();

});