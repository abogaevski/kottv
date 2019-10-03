$(document).ready(function(){
  //Инициализация плагина анимаций при скролле
  AOS.init({
    once: true,
    offset: 120,
    duration: 1000
  });

  //клонирование слайдов за телевизором в блоке #intro
  $('[data-intro-river-carousel]').each(function(){
    for (var i = 0; i < 3; i++) {
      $(this).find('.channels-slide').clone().appendTo(this);
    }
  });

  //Биндинги
  $('[data-link="lk"]').on('click', function(){
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
    prevArrow:"<div class='intro__carousel-nav_left'></div>",
    nextArrow:"<div class='intro__carousel-nav_right'></div>",
    responsive: [
      {
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

  $('[data-key-features="carousel"]').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    adaptiveHeight: true,
    asNavFor: '[data-key-features-content="left-wrap"], [data-key-features-content="right-wrap"]',
    prevArrow:"<div class='key-features__carousel-nav_left'></div>",
    nextArrow:"<div class='key-features__carousel-nav_right'></div>",
    customPaging : function(slider, i) {
      var iconDataClean = $(slider.$slides[i]).data('key-feature-icon');
      var iconData = iconDataClean.split(', ');
      var iconName = iconData[0];
      var iconHeight = iconData[1];
      var iconWidth = iconData[2];

      var thumb = $(slider.$slides[i]).data('key-feature-name');
      return '<div class="key-features__carousel-link"><svg style="height:'+iconHeight+'; width:'+iconWidth+'"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#'+iconName+'"></use></svg><span>'+thumb+'</span></div>';    
    }
  });
  $('[data-key-features-content="left-wrap"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    //adaptiveHeight: true,
    draggable: false,
    asNavFor: '[data-key-features="carousel"], [data-key-features-content="right-wrap"]',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          adaptiveHeight: true
        }
      },
    ]
  });
  $('[data-key-features-content="right-wrap"]').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    //adaptiveHeight: true,
    draggable: false,
    asNavFor: '[data-key-features="carousel"], [data-key-features-content="left-wrap"]',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          adaptiveHeight: true
        }
      },
    ]
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
    pauseOnHover:false
  });
  $('[data-key-features="carousel"] .slick-dots').wrap('<div class="key-features__dots" data-features-dots></div>');

  //Попапы
  $('[data-popup="channels"]').magnificPopup({
    type: 'inline',
    preloader: false,
    fixedContentPos: true,
    removalDelay: 500,
    callbacks: {
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');
        var subscriptionType = this.st.el.attr('data-subscription-type');
        if (subscriptionType) {
          $('[data-category-tabs-link]').removeClass('is-active');
          $('[data-category-tabs-link="'+subscriptionType+'"]').addClass('is-active');
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
      beforeOpen: function() {
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
      }
    },
    submitHandler: function(form){
      $('[data-callback="form"]').hide();
      $.ajax({
        url:'/ott',
        type: "post",
        data: $(form).serialize(),
        success: function(){
          $('[data-callback="success"]').show();
        },
        error:function(){

        }
      });
    }
  });

  $('[data-login-step="1"]').validate({
    messages: {
      loginPhone: {
        required: 'Введите ваш телефон',
        loginPhone: 'Неверный формат телефона'
      },
      loginPersonalData: 'Необходимо ваше согласие на обработку персональных данных'
    },
    rules: {
      loginPhone: {
        phoneFormat: true
      }
    },
    submitHandler: function(form){
      $('[data-user="phone"]').html($('#loginPhone').val());
      $('[data-login-input="phone"]').val($('#loginPhone').val());
      $('[data-login-step="1"]').hide();
      $('[data-login-step="2"]').show();
      countDown(59);
      $.ajax({
        contentType: 'application/json',
        data: '{ "phone": "' + $('#loginPhone').val() + '" }',
        dataType: 'json',
        success: function(data){
          console.log("Successfull send OTP");
        },
        error: function(){
          console.log("Error send OTP");
        },
        processData: false,
        type: 'POST',
        url: APIOTPURL
      });
    }
  });

  $('[data-login-step="2"]').validate({
    messages: {
      userCode: 'Введите код',
    },
    submitHandler: function(form){
      form.submit();
      console.log('yay!');
    }
  });

  jQuery.validator.addMethod('phoneFormat', function(value, element) {
    return this.optional( element ) || /\+7\s\(\9\d{2}\)\s\d{3}-\d{2}-\d{2}/i.test( value );
  }, 'Неверный формат телефона');

  // Таймер повторной отправки
  var myTimer = $('[data-send-again] span');
  var myBtn = $('[data-send-again]');
  function countDown(timeout) {
    if (timeout < 10) {
      myTimer.html("00:0" + timeout);
    } else {
      myTimer.html("00:" + timeout);
    }
    if (timeout <= 0) {
      myBtn.removeClass('is-disabled');
      console.log('Ready!');
      return;
    }
    timeout -= 1;
    window.setTimeout(function(){
      countDown(timeout);
    }, 1000);
  }

  //Табы телеканалов
  $(document).on('click', '[data-category-tabs-link]', function(){
    var selectedTab = $(this).data('category-tabs-link');
    if ( !$(this).hasClass('is-active') ) {
      $('[data-category-tabs-link]').removeClass('is-active');
      $('[data-category-tabs]').removeClass('is-active');
      $(this).addClass('is-active');
      $('[data-category-tabs="' + selectedTab + '"]').addClass('is-active');
    }
  });

  //Дропдаун в шапке
  $('[data-dropdown-link]').on('click', function(){
    var dropdownLink = $(this).data('dropdown-link');
    var dropdownContainer = $('[data-dropdown="' + dropdownLink + '"]');

    if ( dropdownContainer.hasClass('is-active') ) {
      $(this).toggleClass('is-active');
      dropdownContainer.toggleClass('is-active');
    } else {
      $('[data-dropdown-link]').removeClass('is-active');
      $('[data-dropdown]').removeClass('is-active');

      $(this).toggleClass('is-active');
      dropdownContainer.toggleClass('is-active');
    }
  });
  $('[data-dropdown-close]').on('click', function(e){
    $('[data-dropdown-link]').removeClass('is-active');
    $('[data-dropdown]').removeClass('is-active');
  });
  $(document).mouseup(function(e) {
    var headContainer = $('header');
    var popupContainer = $('.mfp-wrap');
    var notHeader = !headContainer.is(e.target) && headContainer.has(e.target).length === 0;
    var notPopup = !popupContainer.is(e.target) && popupContainer.has(e.target).length === 0;
    if (notHeader && notPopup){
      $('[data-dropdown]').removeClass('is-active');
      $('[data-dropdown-link]').removeClass('is-active');
    }
  });


  // Маски
  $('[data-mask="phone"]').mask('+7 (999) 999-99-99', {
    placeholder:" ",
    skipOptionalPartCharacter: " ",
    clearIncomplete: true,
    completed: function(){
      console.log('entered!')
    }
  });

  //Центрирование пагинации
  function centerPagination(outerContent, innerContent, currentElement){
    var outerContentWidth = outerContent.width();
    var innerContentWidth = innerContent.width();
    var currentElementWidth = currentElement.width();

    var maxWidthDifference = -Math.abs(innerContentWidth - outerContentWidth);

    var currentElementPosition = currentElement.position();
    var currentElementPositionLeft = currentElementPosition.left;

    var centerPosition = (outerContentWidth - currentElementWidth) / 2 - currentElementPositionLeft;
    if (centerPosition > 0) {
      centerPosition = 0;
    } else if (centerPosition < maxWidthDifference){
      centerPosition = maxWidthDifference;
    }
    innerContent.animate( {"left": centerPosition}, 250, "linear" ); 
  }

  $('[data-key-features="carousel"]').on('beforeChange', function (event, slick, currentSlide, nextSlide){
    var carouselEl = $(slick.$slider);
    var dotsEl = $(slick.$dots);
    var currentDot = dotsEl.find('li').eq(nextSlide);

    centerPagination(carouselEl, dotsEl, currentDot);
  });


  //Fixed paging
  var dotsElWrap = $('[data-key-features="carousel"]'),
      dotsEl = $('[data-features-dots]');
  
  if ( dotsElWrap.length ) {
    $(document).scroll(function () {
      fixedScroll(dotsElWrap, dotsEl);
    });
  }
    
  function fixedScroll(elemWrap, elem){
    // elemWrap необходим для отсчёт позиции старта
    var startPosition = elemWrap.offset().top,
        stopPosition = $('#devices').offset().top - elem.outerHeight();

    windowTop = $(this).scrollTop();

    if (windowTop + $('header').height() > startPosition) {
      elem.addClass('sticky');
      if (windowTop + $('header').height() > stopPosition) {
        elem.css('top', stopPosition - windowTop);
      } else {
        elem.css('top', $('header').height());
      }
    } else {
      elem.removeClass('sticky');
      elem.removeAttr('style');
    }
  }

  //Позиционирование курсора при клике на инпут
  $.fn.selectRange = function(start, end) {
    if(end === undefined) {
      end = start;
    }
    return this.each(function() {
      if('selectionStart' in this) {
        this.selectionStart = start;
        this.selectionEnd = end;
      } else if(this.setSelectionRange) {
        this.setSelectionRange(start, end);
      } else if(this.createTextRange) {
        var range = this.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    });
  };
  $('[data-mask="phone"]').on('click', function(){
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
});
