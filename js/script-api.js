jQuery(document).ready(function ($) {
  var apiKey = 'YOUR-API';
  var userID = 'USERNAME';

  (function () {
      var behanceUserAPI = 'https://www.behance.net/v2/users/' + userID + '?callback=?&api_key=' + apiKey;

      function setUserTemplate() {
          var userData = JSON.parse(sessionStorage.getItem('behanceUser')),
              getTemplate = $('#profile-template').html(),
              template = Handlebars.compile(getTemplate),
              result = template(userData);
          $('#home').html(result);
      }

      if (sessionStorage.getItem('behanceUser')) {
          setUserTemplate();
      } else {
          $.getJSON(behanceUserAPI, function (user) {
              var data = JSON.stringify(user);
              sessionStorage.setItem('behanceUser', data);
              setUserTemplate();
          });
      }
  })();

  (function () {
      var perPage = 15;
      var behanceProjectAPI = 'https://www.behance.net/v2/users/' + userID + '/projects?callback=?&api_key=' + apiKey + '&per_page=' + perPage;

      function setPortfolioTemplate() {
          var projectData = JSON.parse(sessionStorage.getItem('behanceProject')),
              getTemplate = $('#portfolio-template').html(),
              template = Handlebars.compile(getTemplate),
              result = template(projectData);
          $('#portfolio-grid').html(result);
      }

      if (sessionStorage.getItem('behanceProject')) {
          setPortfolioTemplate();
      } else {
          $.getJSON(behanceProjectAPI, function (project) {
              var data = JSON.stringify(project);
              sessionStorage.setItem('behanceProject', data);
              setPortfolioTemplate();
          });
      }
  })();

  // niceScroll
  $("html").niceScroll();

  // Stick menu
  $(".menu").sticky({ topSpacing: 0 });

  // Menu mobile click
  $(".icon").click(function () {
      $("ul.menu-click").slideToggle("slow");
  });
});

$(window).on('load', function () {
  // Menu Scroll to content and Active menu
  var lastId,
      topMenu = $("#menu"),
      topMenuHeight = topMenu.outerHeight() + 145,
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function () {
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
      });

  $('a[href*=#]').on('click', function (e) {
      e.preventDefault();

      var target = $(this).attr("href");
      $('html, body').stop().animate({ scrollTop: $(target).offset().top - 140 }, 1000);
      return false;
  });

  $(window).scroll(function () {
      var fromTop = $(this).scrollTop() + topMenuHeight;
      var cur = scrollItems.map(function () {
          if ($(this).offset().top < fromTop) return this;
      });

      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
          lastId = id;
          menuItems
              .parent().removeClass("active")
              .end().filter("[href='#" + id + "']").parent().addClass("active");
      }
  });

  $(".preloader").delay(1000).fadeOut("slow");

  $(document).ready(function() {
    // Parallax - apenas em dispositivos não móveis
    if ($('.parallax-background').length && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".parallax-background").parallax();
    }

    if ($('.parallax-background-partners').length && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".parallax-background-partners").parallax();
    }

    // Configurações específicas para dispositivos móveis
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $(".footer").css("position", "relative");
        $(".contact").css("marginBottom", "0");
        // Adicionando uma classe para desabilitar o parallax em dispositivos móveis
        $("body").addClass("no-parallax");
    } else {
        // FadeTo elements
        if ($(window).width() > 1023) {
            var tiles = $("h2, h3, .column-one, .column-two, .column-three, .grid li, .contact .content .form, .contact .content .contact-text").fadeTo(0, 0);

            $(window).scroll(function () {
                tiles.each(function () {
                    var a = $(this).offset().top + $(this).height();
                    var b = $(window).scrollTop() + $(window).height();
                    if (a < b) $(this).fadeTo(1000, 1);
                });
            });
        }
    }
});
