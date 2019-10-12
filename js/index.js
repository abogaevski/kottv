$(document).ready(function () {
  //Инициализация плагина анимаций при скролле
  AOS.init({
    once: true,
    offset: 120,
    duration: 1000
  });

  //клонирование слайдов за телевизором в блоке #intro
  $('[data-intro-river-carousel]').each(function () {
    for (var i = 0; i < 3; i++) {
      $(this).find('.channels-slide').clone().appendTo(this);
    }
  });

  //Биндинги
  $('[data-link="lk"]').on('click', function () {
    window.location.replace("/lk");
  });

  //Карусели
  $('[data-intro-slide]').clone().appendTo('[data-intro="carousel"]');
  $('[data-intro-detail="slide"]').clone().appendTo('[data-intro-detail="carousel"]');
  $('[data-intro="carousel"]').slick({
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 7,
    slidesToScroll: 1,
    speed: 800,
    asNavFor: '[data-intro-detail="carousel"]',
    prevArrow: "<div class='intro__carousel-nav_left'></div>",
    nextArrow: "<div class='intro__carousel-nav_right'></div>",
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    ]
  });
  $('[data-intro-detail="carousel"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    fade: true,
    asNavFor: '[data-intro="carousel"]'
  });
  $('[data-intro="carousel"].slick-slider').on('click', '[data-intro-slide]', function (e) {
    e.stopPropagation();
    var index = $(this).data('slick-index');

    if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
      $('.slick-slider').slick('slickGoTo', index);
    }
  });

  // Features slider
  $('[data-key-features-slide]').clone().appendTo('[data-key-features="carousel"]');
  $('[data-key-features-content="left"]').clone().appendTo('[data-key-features-content="left-wrap"]');
  $('[data-key-features-content="right"]').clone().appendTo('[data-key-features-content="right-wrap"]');

  $('[data-key-features="carousel"]').slick({
    centerMode: true,
    centerPadding: '0px',
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 800,
    asNavFor: '[data-key-features-content="left-wrap"], [data-key-features-content="right-wrap"]',
    prevArrow: "<div class='key-features__carousel-nav_left'></div>",
    nextArrow: "<div class='key-features__carousel-nav_right'></div>",
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    ]
  });
  $('[data-key-features-content="left-wrap"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    //adaptiveHeight: true,
    draggable: false,
    asNavFor: '[data-key-features="carousel"], [data-key-features-content="right-wrap"]',
    responsive: [{
      breakpoint: 992,
      settings: {
        adaptiveHeight: true
      }
    },]
  });
  $('[data-key-features-content="right-wrap"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    //adaptiveHeight: true,
    draggable: false,
    asNavFor: '[data-key-features="carousel"],[data-key-features-content="left-wrap"]',
    responsive: [{
      breakpoint: 992,
      settings: {
        adaptiveHeight: true
      }
    },]
  });
  $('[data-key-features-tv="carousel"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    fade: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: false
  });


  $('[data-key-features="carousel"].slick-slider').on('click', '[data-key-features-slide]', function (e) {
    e.stopPropagation();
    var index = $(this).data('slick-index');
    if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
      $('.slick-slider').slick('slickGoTo', index);
    }
  });

  //Попапы
  $('[data-popup="channels"]').magnificPopup({
    type: 'inline',
    preloader: false,
    fixedContentPos: true,
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
        var subscriptionType = this.st.el.attr('data-subscription-type');
        if (subscriptionType) {
          $('[data-category-tabs-link]').removeClass('is-active');
          $('[data-category-tabs-link="' + subscriptionType + '"]').addClass('is-active');
          $('[data-category-tabs]').removeClass('is-active');
          $('[data-category-tabs="' + subscriptionType + '"]').addClass('is-active');
        }
      }
    },
    midClick: true
  });

  $('[data-popup="connect"]').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    preloader: false,
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    },
    midClick: true
  });


  // Валидации
  $('[data-callback="form"]').validate({
    messages: {
      fio: 'Введите ваше имя',
      phone: {
        required: 'Введите ваш телефон',
        loginPhone: 'Неверный формат телефона'
      },
      personalData: 'Необходимо ваше согласие на обработку персональных данных'
    },
    rules: {
      phone: {
        phoneFormat: true
      },
    },
    submitHandler: function (form) {
      $('[data-callback="form"]').hide();
      $.ajax({
        url: '/ott',
        type: "post",
        data: $(form).serialize(),
        success: function () {
          $('[data-callback="success"]').show();
        },
        error: function () {
          console.log("ERROROROR")
        }
      });
    }
  });

  jQuery.validator.addMethod('phoneFormat', function (value, element) {
    return this.optional(element) || /\+375\s\(\d{2}\)\s\d{3}-\d{2}-\d{2}/i.test(value);
  }, 'Неверный формат телефона');

  jQuery.extend(jQuery.validator.messages, {
    required: "Обязательное поле"
  });

  //Табы телеканалов
  $(document).on('click', '[data-category-tabs-link]', function () {
    var selectedTab = $(this).data('category-tabs-link');
    if (!$(this).hasClass('is-active')) {
      $('[data-category-tabs-link]').removeClass('is-active');
      $('[data-category-tabs]').removeClass('is-active');
      $(this).addClass('is-active');
      $('[data-category-tabs="' + selectedTab + '"]').addClass('is-active');
    }
  });

  // //Дропдаун в шапке
  // $('[data-dropdown-link]').on('click', function () {
  //   var dropdownLink = $(this).data('dropdown-link');
  //   var dropdownContainer = $('[data-dropdown="' + dropdownLink + '"]');

  //   if (dropdownContainer.hasClass('is-active')) {
  //     $(this).toggleClass('is-active');
  //     dropdownContainer.toggleClass('is-active');
  //   } else {
  //     $('[data-dropdown-link]').removeClass('is-active');
  //     $('[data-dropdown]').removeClass('is-active');

  //     $(this).toggleClass('is-active');
  //     dropdownContainer.toggleClass('is-active');
  //   }
  // });
  // $('[data-dropdown-close]').on('click', function (e) {
  //   $('[data-dropdown-link]').removeClass('is-active');
  //   $('[data-dropdown]').removeClass('is-active');
  // });
  // $(document).mouseup(function (e) {
  //   var headContainer = $('header');
  //   var popupContainer = $('.mfp-wrap');
  //   var notHeader = !headContainer.is(e.target) && headContainer.has(e.target).length === 0;
  //   var notPopup = !popupContainer.is(e.target) && popupContainer.has(e.target).length === 0;
  //   if (notHeader && notPopup) {
  //     $('[data-dropdown]').removeClass('is-active');
  //     $('[data-dropdown-link]').removeClass('is-active');
  //   }
  // });


  // Маски
  $('[data-mask="phone"]').mask('+375 (99) 999-99-99', {
    placeholder: " ",
    skipOptionalPartCharacter: " ",
    clearIncomplete: true,
    completed: function () {
      console.log('entered!')
    }
  });

  //Позиционирование курсора при клике на инпут
  $.fn.selectRange = function (start, end) {
    if (end === undefined) {
      end = start;
    }
    return this.each(function () {
      if ('selectionStart' in this) {
        this.selectionStart = start;
        this.selectionEnd = end;
      } else if (this.setSelectionRange) {
        this.setSelectionRange(start, end);
      } else if (this.createTextRange) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    });
  };
  $('[data-mask="phone"]').on('click', function () {
    $(this).selectRange(4);
  });


  //
  /*$('[data-lk-link]').on('click', function(e){
    e.preventDefault();

    var userAuthorized = false;
    if (userAuthorized) {
      console.log('Ссылка на личный кабинет');
    } else {
      $('[data-lk-auth]').click();
    }
  });*/
  $("[href='#popup-channels'], [data-category-tabs-link]").click(function () {
    $('.popup-channels__section-channel-logo img').Lazy({
      effect: 'fadeIn',
      visibleOnly: true,
      bind: "event",
      delay: 100,
      defaultImage : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTBweCIgaGVpZ2h0PSI1MHB4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9Imxkcy1yaXBwbGUiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6IGF1dG87IGFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nOyBhbmltYXRpb24tZGVsYXk6IDBzOyBiYWNrZ3JvdW5kOiBub25lOyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjUuNjgzIiBmaWxsPSJub25lIiBuZy1hdHRyLXN0cm9rZT0ie3tjb25maWcuYzF9fSIgbmctYXR0ci1zdHJva2Utd2lkdGg9Int7Y29uZmlnLndpZHRofX0iIHN0cm9rZT0iIzA1ZGJmMyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHlsZT0iYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7IGFuaW1hdGlvbi1kZWxheTogMHM7Ij48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjA7NDAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS4zIiBrZXlTcGxpbmVzPSIwIDAuMiAwLjggMSIgYmVnaW49Ii0wLjY1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIHN0eWxlPSJhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZzsgYW5pbWF0aW9uLWRlbGF5OiAwczsiPjwvYW5pbWF0ZT48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiBjYWxjTW9kZT0ic3BsaW5lIiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjMiIGtleVNwbGluZXM9IjAuMiAwIDAuOCAxIiBiZWdpbj0iLTAuNjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgc3R5bGU9ImFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nOyBhbmltYXRpb24tZGVsYXk6IDBzOyI+PC9hbmltYXRlPjwvY2lyY2xlPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjM5Ljk4OTgiIGZpbGw9Im5vbmUiIG5nLWF0dHItc3Ryb2tlPSJ7e2NvbmZpZy5jMn19IiBuZy1hdHRyLXN0cm9rZS13aWR0aD0ie3tjb25maWcud2lkdGh9fSIgc3Ryb2tlPSIjZjI1Y2MwIiBzdHJva2Utd2lkdGg9IjEiIHN0eWxlPSJhbmltYXRpb24tcGxheS1zdGF0ZTogcnVubmluZzsgYW5pbWF0aW9uLWRlbGF5OiAwczsiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIGNhbGNNb2RlPSJzcGxpbmUiIHZhbHVlcz0iMDs0MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxLjMiIGtleVNwbGluZXM9IjAgMC4yIDAuOCAxIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBzdHlsZT0iYW5pbWF0aW9uLXBsYXktc3RhdGU6IHJ1bm5pbmc7IGFuaW1hdGlvbi1kZWxheTogMHM7Ij48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgY2FsY01vZGU9InNwbGluZSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMS4zIiBrZXlTcGxpbmVzPSIwLjIgMCAwLjggMSIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgc3R5bGU9ImFuaW1hdGlvbi1wbGF5LXN0YXRlOiBydW5uaW5nOyBhbmltYXRpb24tZGVsYXk6IDBzOyI+PC9hbmltYXRlPjwvY2lyY2xlPjwvc3ZnPg==",
      onError: function(element) {
        console.log('error loading ' + element.data('src'));
    }
    });
  })

});