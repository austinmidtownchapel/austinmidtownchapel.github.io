(function() {
  var $window = $(window);
  var $nav = $(document.getElementsByTagName('nav'));
  var NAV_HEIGHT = $nav.height();
  var vh = $window.height();

  function navShouldBeFixed() {
    return state().scroll >= state().vh - NAV_HEIGHT;
  }

  function fixNav(shouldFix) {
    if (shouldFix) {
      $nav.find('.nav-menu').addClass('no-transition');
      $nav.addClass('fixed');
      setTimeout(function() {
        $nav.find('.nav-menu').removeClass('no-transition');
      }, 0);
    } else {
      $nav.find('.nav-menu').addClass('no-transition');
      $nav.removeClass('fixed');
      $nav.find('.nav-menu')[0].getBoundingClientRect();
      setTimeout(function() {
        $nav.find('.nav-menu').removeClass('no-transition');
      }, 0);
    }
  }

  state.onchange(function(event, current, previous) {
    if (current.scroll != previous.scroll || current.vh != previous.vh)
      state({fixed: navShouldBeFixed()});

    if (current.fixed != previous.fixed)
      fixNav(current.fixed);

    if (current.navOpen !== previous.navOpen)
     if (current.navOpen)
       $nav.addClass('open');
     else
       $nav.removeClass('open');
  });

  $window.on('resize orientationchange', function() {
      state({vh: $window.height()});
    })
    .on('scroll', function() {
      state({scroll: window.scrollY});
    });

  $(document.body).on('click', '.hamburger', function() {
    state({navOpen: !state().navOpen});
  });

  state({
    vh: $window.height(),
    scroll: window.scrollY
  });
})();
