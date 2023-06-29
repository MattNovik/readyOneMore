"use strict";

require("owl.carousel");

require("jquery-validation");

require("./jquery.selectric.min.js");

var _maskInput2 = _interopRequireDefault(require("mask-input"));

require("malihu-custom-scrollbar-plugin");

var _prettier = require("prettier");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createOrder(form) {
  var formArray = $(form).serializeArray();
  var filesArray = $(form).find('#file-upload');
  var formData = new FormData();
  openLoaderPopup($('#loaderPopup'));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = formArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;
      formData.append(elem.name, elem.value);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (!!filesArray.length) {
    filesArray = filesArray[0].files;
    Array.from(filesArray).forEach(function (file) {
      formData.append('files[]', file);
    });
  }

  ym(MainSettings.metrika, 'reachGoal', 'raschet'); // console.log(new FormData();

  $.ajax({
    // инициализируем ajax запрос
    type: 'POST',
    // в каком формате отправляем
    url: '/wp-content/themes/studservice/ajax/createOrder.php',
    // путь до обработчика, у нас он лежит в той же папке
    data: formData,
    // данные для отправки
    dataType: 'json',
    processData: false,
    cache: false,
    contentType: false,
    success: function success(response) {
      if (typeof response.link !== 'undefined' && response.link.length > 0) {
        return window.location.href = response.link;
      }

      if (response.order_id && response.action === 'userIsset') {
        return window.location.href = MainSettings.lk_url + 'orders/newOrder/id=' + response.order_id + '/new/';
      } else {
        return window.location.href = MainSettings.lk_url;
      }
    },
    error: function error(xhr, status, _error) {
      closeLoaderPopup($('#loaderPopup'));
      alert('Ошибка отправки');
      return false;
    }
  });
  return false;
}

function closeLoaderPopup(popup) {
  popup.removeClass('open');
  $('body').removeClass('overflow-hidden');
}

function openLoaderPopup(popup) {
  popup.addClass('open');
  $('body').addClass('overflow-hidden');
}

var initCalculatorForm = function initCalculatorForm() {
  var step = 0;
  var countSteps = 3;
  var $container = $('#calculatorContainer');
  if (!$container.length) return false;
  var $btnNext = $container.find('.js-steps-next');
  var $btnSubmit = $container.find('.js-steps-submit');
  var $steps = $container.find('.calculator__steps__item');
  var $stepInfo = $('.calculator__progress__info');
  var $percentInfo = $('.calculator__progress__procents');
  var $progressSteps = $('.calculator__progress__line__grey');
  var $pregressInfo = $('.calculator__progress__line__green');
  var $menu = $('.calculator__steps-menu li');
  var validator = $('#calculatorForm').validate({
    onsubmit: false,
    rules: {
      email: {
        required: true,
        email: true
      },
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        minlength: 2,
        maxlength: 20
      },
      theme: {
        required: true,
        minlength: 2
      },
      type_of_work_raw: {
        required: true
      },
      agreeament: {
        required: true
      }
    },
    submitHandler: function submitHandler(form) {
      console.log(form); //createOrder(form);
    },
    errorElement: 'span',
    errorPlacement: function errorPlacement(error, element) {
      var data = element.data('selectric');
      error.appendTo(data ? element.closest('.' + data.classes.wrapper).parent() : element.parent());
    },
    highlight: function highlight(element) {
      if (element.type === 'select-one') {
        $(element).parent().parent().addClass('error');
      } else if (element.type === 'hidden') {
        $(element).parent().addClass('error');
      } else {
        $(element).addClass('error');
      }
    },
    unhighlight: function unhighlight(element) {
      if (element.type === 'select-one') {
        $(element).parent().parent().removeClass('error');
      } else if (element.type === 'hidden') {
        $(element).parent().removeClass('error');
      } else {
        $(element).removeClass('error');
      }
    }
  });

  var validateStep = function validateStep() {
    var $stepContainer = $($steps[step]);
    var $requireds = $stepContainer.find('.js-required');
    console.log($('#calculatorForm').valid());
    console.log(validator);
    var errors = {};
    validator.errorList.forEach(function (error) {
      return errors[error.element.name] = true;
    }); // var form
    // const errors = form.errorsList;

    var errorsInStep = false;
    if (!$requireds.length) return true;
    $requireds.each(function (index, element) {
      var elem = $stepContainer.find('[name=' + element.name + ']');

      if (typeof errors !== 'undefined') {
        if (!!errors[element.name]) {
          elem.addClass('error');
          errorsInStep = true;
        } else {
          elem.removeClass('error');
        }
      } else {
        errorsInStep = false;
      }
    });
    return !errorsInStep;
  };

  var getStep = function getStep() {
    return step + 1;
  };

  var getPercentStep = function getPercentStep() {
    return Math.floor(getStep() * (100 / countSteps));
  };

  var getPercentInfo = function getPercentInfo() {
    return (getStep() - 1) * Math.floor(100 / countSteps);
  };

  var setInfo = function setInfo() {
    $stepInfo.html('+33% за ' + getStep() + 'й шаг');
    $percentInfo.html(getPercentInfo());
  };

  var setProgressSteps = function setProgressSteps() {
    $progressSteps.css({
      width: getPercentStep() + '%'
    });
    $pregressInfo.css({
      width: getPercentInfo() + '%'
    });
  };

  var setMenuCurrent = function setMenuCurrent() {
    $($menu[step]).addClass('current');
  };

  var setStepCurrent = function setStepCurrent() {
    $steps.removeClass('current');
    $($steps[step]).addClass('current');
  };

  $btnNext.on('click', function (item) {
    if (getStep() === countSteps) return false;
    if (!!$(item.target).attr('required') && !validateStep()) return false;
    step++;
    setMenuCurrent();
    setStepCurrent();
    setInfo();
    setProgressSteps();
    return false;
  });
  $btnSubmit.on('click', function (e) {
    e.preventDefault();
    if (!validateStep()) return false; //createOrder('form#calculatorForm');

    return false;
  });
}; // const validate = require('./validate.js');
// import IMask from 'imask';


$(document).ready(function () {
  var MainSettings = {
    root: '/wp-content/themes/studservice/',
    lk_url: 'https://studservis-lk.ru/',
    metrika: '46159971'
  }; // Начало Создание маску для формы ввода телефона

  if (document.querySelector('#phonefield')) {
    var maskInput = new _maskInput2["default"](document.querySelector('#phonefield'), {
      mask: '+7 (000) 000-00-00',
      alwaysShowMask: true,
      maskChar: '_',
      onChange: function onChange(e) {
        console.log(e.target.value);
      }
    });
    document.querySelector('#phonefield').value = '';
    document.querySelector('#phonefield').addEventListener('paste', function (e) {
      e.preventDefault();
      var paste = (e.clipboardData || window.clipboardData).getData('text');

      if (paste[0] === '8') {
        console.log(paste.slice(1));
        console.log(e);
        e.target.value = e.target.value.slice(0, 4) + e.target.value.slice(5, 7) + e.target.value.slice(9, 10) + ') ' + e.target.value.slice(10, 12) + e.target.value.slice(13, 14) + '-' + e.target.value.slice(14, 15) + e.target.value.slice(16, 17) + '-' + e.target.value.slice(17, 18) + paste[paste.length - 1];
        console.log(e.target.value);
        console.log(document.querySelector('#phonefield').value);
      }

      console.log(paste);
      console.log(e.target.value);
    });
  }

  if (document.querySelector('#popupphone')) {
    var _maskInput = new _maskInput2["default"](document.querySelector('#popupphone'), {
      mask: '+7 (000) 000-00-00',
      alwaysShowMask: true,
      maskChar: '_'
    });

    document.querySelector('#popupphone').value = '';
  } // Конец создания маски для формы ввода телефона


  $.validator.setDefaults({
    submitHandler: function submitHandler(form) {
      createOrder(form);
    }
  });
  /* 
  function openLoaderPopup(popup) {
    popup.addClass('open');
    $('body').addClass('overflow-hidden');
  } */

  /*   function closeLoaderPopup(popup) {
    popup.removeClass('open');
    $('body').removeClass('overflow-hidden');
  } */

  /*   function createOrder(form) {
    const formArray = $(form).serializeArray();
    var filesArray = $(form).find('#file-upload');
    const formData = new FormData();
    openLoaderPopup($('#loaderPopup'));
    for (let elem of formArray) {
      formData.append(elem.name, elem.value);
    }
      if (!!filesArray.length) {
      filesArray = filesArray[0].files;
      Array.from(filesArray).forEach((file) => {
        formData.append('files[]', file);
      });
    }
    ym(MainSettings.metrika, 'reachGoal', 'raschet');
    // console.log(new FormData();
    $.ajax({
      // инициализируем ajax запрос
      type: 'POST', // в каком формате отправляем
      url: '/wp-content/themes/studservice/ajax/createOrder.php', // путь до обработчика, у нас он лежит в той же папке
      data: formData, // данные для отправки
      dataType: 'json',
      processData: false,
      cache: false,
      contentType: false,
      success: function (response) {
        if (typeof response.link !== 'undefined' && response.link.length > 0) {
          return (window.location.href = response.link);
        }
        if (response.order_id && response.action === 'userIsset') {
          return (window.location.href =
            MainSettings.lk_url +
            'orders/newOrder/id=' +
            response.order_id +
            '/new/');
        } else {
          return (window.location.href = MainSettings.lk_url);
        }
      },
      error: function (xhr, status, error) {
        closeLoaderPopup($('#loaderPopup'));
        alert('Ошибка отправки');
        return false;
      },
    });
      return false;
  } */
  // create owl.carousel for nav-blog__menu

  $('.nav-blog__menu').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    autoWidth: true,
    items: 4,
    dots: false,
    navText: ["<img class='nav-blog__prev' alt='carousel-prev-button' src='/wp-content/themes/studservice/new/img/arrow-left.svg'>", "<img class='nav-blog__next' alt='carousel-prev-button' src='/wp-content/themes/studservice/new/img/arrow-left.svg'>"]
  });
  var listNavBlogMenuItems = document.querySelectorAll('.cat-item a');

  if (listNavBlogMenuItems.length) {
    var location = window.location.href.split('#')[0];
    var initData = false;
    Array.from(listNavBlogMenuItems).map(function (item) {
      var link = item.getAttribute('href');

      if (location === link) {
        item.classList.add('active');
        initData = true;
      }
    });

    if (initData === false) {
      listNavBlogMenuItems[0].classList.add('active');
    }
  }

  var $singleService = $('.single-service h1');

  if ($singleService.length > 0) {
    var $selectWorkItem = $("select[name=type_of_work_raw].set-default option[value='" + $singleService.attr('data-name') + "']");
    var $selectedIndex = $selectWorkItem.index();
    $('select[name=type_of_work_raw].set-default').prop('selectedIndex', $selectedIndex).selectric('refresh').selectric('open').selectric('close');
  }

  $('#type_of_works_select').on('change', function () {
    var priceStr = $('select#type_of_works_select option:selected').data('price');
    var arr = priceStr.split('/');
    $('.footer__popup__content__price i').text(arr[0] + ' *');
  });
  var form = $('#filterForm');
  var orderPopupForm = $('#orderPopupForm');
  var leadHunterFormOne = $('.leadHunterFormOne');
  var leadHunterFormTwo = $('.leadHunterFormTwo');
  var calculateForm = $('#calculateForm');
  var requestCallForm = $('#requestCallForm');
  var addReviewForm = $('#addReview');
  var blogForm = $('#blogForm'); // $('.js-scroll').mCustomScrollbar();

  $('select:not(.clear-select)').selectric({
    maxHeight: 200,
    nativeOnMobile: true
  });
  var $reviewsslider = $('.js-carousel');
  $reviewsslider.owlCarousel({
    loop: true,
    margin: 20,
    autoplay: false,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
        autoHeight: true,
        slideBy: 1
      },
      768: {
        items: 1,
        slideBy: 1
      },
      1024: {
        items: 2,
        slideBy: 2
      }
    }
  });
  var $worktapeslider = $('.js-worktape-carousel');
  $worktapeslider.owlCarousel({
    loop: false,
    margin: 20,
    autoplay: false,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
        autoHeight: true,
        slideBy: 1
      },
      768: {
        autoWidth: true,
        items: 3
      },
      1024: {
        autoWidth: true,
        items: 4,
        slideBy: 2
      }
    }
  });
  $('.js-carousel-prev').on('click', function () {
    $reviewsslider.trigger('prev.owl.carousel');
  });
  $('.js-carousel-next').on('click', function () {
    $reviewsslider.trigger('next.owl.carousel');
  });
  $('.header-topbar__burger').on('click', function () {
    $('.header').toggleClass('mobilemenu-open');
    return false;
  });
  $('.js-openrequestcall').on('click', function () {
    openRequestСall();
  });
  $('.js-closerequestcall').on('click', function () {
    closeRequestСall();
  });
  $('.js-openrequestorder').on('click', function () {
    openRequestOrder();
  });
  $('.js-closerequestorder').on('click', function () {
    closeRequestOrder();
  });
  $('.js-openrequestreviews').on('click', function () {
    openRequestReviews();
  });
  $('.js-closerequestreviews').on('click', function () {
    closeRequestReviews();
  });
  $('.js-openrequestcity').on('click', function () {
    openRequestCity();
  });
  $('.js-closerequestcity').on('click', function () {
    closeRequestCity();
  });
  $('.js-opencalculate').on('click', function () {
    openCalculate();
  });
  $('.js-closecalculate').on('click', function () {
    closeCalculate();
  });
  $('.question-answer__catalog__item__title').on('click', function (elem) {
    $(elem.target).parent().toggleClass('open');
  });
  $('#unsubscribeForm').validate({
    rules: {
      // simple rule, converted to {required:true}
      reason: 'required',
      // compound rule
      another_reason: {
        required: {
          depends: function depends(element) {
            return $('input.another').is(':checked');
          }
        }
      }
    },
    messages: {
      reason: 'Выберите причину отписки от рассылки',
      another_reason: 'Заполните поле комментария, т.к. вы выбрали причину отписки "Другое"'
    },
    errorElement: 'div',
    errorLabelContainer: '.unsub_error',
    submitHandler: function submitHandler(form) {
      $.ajax({
        type: 'post',
        url: '/unsubscribe.php',
        data: $(form).serialize(),
        success: function success() {
          $('#unsubscribeForm').hide();
          $('html, body').animate({
            scrollTop: 0
          }, 'fast');
          $('#successMessage').show();
        }
      });
    }
  });
  form.validate({
    rules: {
      type_of_work: {
        required: true
      },
      theme: {
        required: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      theme: 'Вы не указали тему работы',
      type_of_work: 'Вы не указали тип работ',
      email: 'Вы не указали E-mail'
    },
    errorElement: 'span'
  });
  requestCallForm.validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Введите ваше имя'
      },
      phone: {
        required: 'Укажите номер телефона для связи'
      }
    },
    errorElement: 'span',
    submitHandler: function submitHandler(form) {
      openLoaderPopup($('#loaderPopup'));
      var formArray = $(form).serializeArray();
      var formData = new FormData();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = formArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var elem = _step2.value;
          formData.append(elem.name, elem.value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      $.ajax({
        // инициализируем ajax запрос
        type: 'POST',
        // в каком формате отправляем
        url: MainSettings.root + '/ajax/recall.php',
        // путь до обработчика, у нас он лежит в той же папке
        data: formData,
        // данные для отправки
        dataType: 'json',
        processData: false,
        cache: false,
        contentType: false,
        success: function success(response) {
          closeLoaderPopup($('#loaderPopup'));

          if (typeof response.success !== 'undefined' && response.success) {
            $(form).html('<p>Спасибо за вашу заявку! С вами в скором времени свяжется наш менеджер!</p>');
          } else {
            alert('Ошибка отправки');
          }
        },
        error: function error(xhr, status, _error2) {
          closeLoaderPopup($('#loaderPopup'));
          alert('Ошибка отправки');
          return false;
        }
      });
      return false;
    }
  });
  calculateForm.validate({
    rules: {
      type_of_work: {
        required: true
      },
      theme: {
        required: true
      },
      email: {
        email: true,
        required: true
      }
    },
    messages: {
      type_of_work: {
        required: 'Укажите тип работы'
      },
      theme: {
        required: 'Укажите тему работы'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Укажите Ваш email'
      }
    },
    errorElement: 'span'
  });
  blogForm.validate({
    rules: {
      type_of_work_raw: {
        required: true
      },
      theme: {
        required: true
      },
      email: {
        email: true,
        required: true
      }
    },
    messages: {
      type_of_work_raw: {
        required: 'Укажите тип работы'
      },
      theme: {
        required: 'Укажите тему работы'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Укажите Ваш email'
      }
    },
    errorElement: 'div',
    errorLabelContainer: '.validate_error'
  });
  leadHunterFormOne.validate({
    rules: {
      type_of_work_raw: {
        required: true
      },
      theme: {
        required: true
      },
      email: {
        email: true,
        required: true
      }
    },
    messages: {
      type_of_work_raw: {
        required: 'Укажите тип работы'
      },
      theme: {
        required: 'Укажите тему работы'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Укажите Ваш email'
      }
    },
    errorElement: 'span'
  });
  leadHunterFormTwo.validate({
    rules: {
      type_of_work_raw: {
        required: true
      },
      theme: {
        required: true
      },
      email: {
        email: true,
        required: true
      }
    },
    messages: {
      type_of_work_raw: {
        required: 'Укажите тип работы'
      },
      theme: {
        required: 'Укажите тему работы'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Укажите Ваш email'
      }
    },
    errorElement: 'span'
  });
  orderPopupForm.validate({
    rules: {
      type_of_work: {
        required: true
      },
      theme: {
        required: true
      },
      email: {
        email: true,
        required: true
      }
    },
    messages: {
      type_of_work: {
        required: 'Укажите тип работы'
      },
      theme: {
        required: 'Укажите тему работы'
      },
      email: {
        email: 'Введите корректный email',
        required: 'Укажите Ваш email'
      }
    },
    errorElement: 'span'
  });
  addReviewForm.validate({
    ignore: [],
    rules: {
      name: {
        required: true
      },
      comment: {
        required: true
      },
      rating: {
        required: true,
        min: 1,
        max: 5
      },
      type_of_work: {
        required: true
      },
      email: {
        email: true
      },
      order_id: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Введите Ваше имя'
      },
      comment: {
        required: 'Введите текст отзыва'
      },
      rating: {
        required: 'Укажите рейтинг',
        min: 'Рейтинг не может быть меньше 1',
        max: 'Рейтинг не может  быть выше 5'
      },
      type_of_work: {
        required: 'Укажите тип работы'
      },
      email: {
        email: 'Укажите корректный email'
      },
      order_id: {
        required: 'Укажите номер заказа'
      }
    },
    errorElement: 'span',
    submitHandler: function submitHandler(form) {
      openLoaderPopup($('#loaderPopup'));
      $.ajax({
        type: 'POST',
        url: MainSettings.root + '/ajax/AddReview.php',
        data: $(form).serialize(),
        success: function success(result) {
          closeRequestReviews();
          closeLoaderPopup($('#loaderPopup'));
          $('#reviewsList').prepend(result);
          $('#addReview').html("<h3 class='text-center'>Вы уже добавляли отзыв</h3>");
          var top_block = $('.reviews__title').offset().top - 150;
          $('html,body').stop().animate({
            scrollTop: top_block
          }, 400);
          $('.empty_reviews').remove();
        },
        error: function error() {
          closeLoaderPopup($('#loaderPopup'));
          console.log('Ошибка отправки.');
        }
      });
      return false;
    },
    errorPlacement: function errorPlacement(error, element) {
      var data = element.data('selectric');
      error.appendTo(data ? element.closest('.' + data.classes.wrapper).parent() : element.parent());
    },
    highlight: function highlight(element) {
      if (element.type === 'select-one') {
        $(element).parent().parent().addClass('error');
      } else if (element.type === 'hidden') {
        $(element).parent().addClass('error');
      } else {
        $(element).addClass('error');
      }
    },
    unhighlight: function unhighlight(element) {
      if (element.type === 'select-one') {
        $(element).parent().parent().removeClass('error');
      } else if (element.type === 'hidden') {
        $(element).parent().removeClass('error');
      } else {
        $(element).removeClass('error');
      }
    }
  });
  var popupRequestСall = $('#popupRequestСall');
  var popupRequestOrder = $('#popupRequestOrder');
  var popupRequestReviews = $('#popupRequestReviews');
  var popupRequestCity = $('#popupRequestCity');
  var popupCalculate = $('#popupCalculate');

  function openRequestСall() {
    popupRequestСall.addClass('open');
    $('body').addClass('overflow-hidden');
  }

  function closeRequestСall() {
    popupRequestСall.removeClass('open');
    $('body').removeClass('overflow-hidden');
  }

  function openRequestOrder() {
    popupRequestOrder.addClass('open');
    $('body').addClass('overflow-hidden');
  }

  function closeRequestOrder() {
    popupRequestOrder.removeClass('open');
    $('body').removeClass('overflow-hidden');
  }

  function openRequestReviews() {
    popupRequestReviews.addClass('open');
    $('body').addClass('overflow-hidden');
  }

  function closeRequestReviews() {
    popupRequestReviews.removeClass('open');
    $('body').removeClass('overflow-hidden');
  }

  function openRequestCity() {
    popupRequestCity.addClass('open');
    $('body').addClass('overflow-hidden');
  }

  function closeRequestCity() {
    popupRequestCity.removeClass('open');
    $('body').removeClass('overflow-hidden');
  }

  function openCalculate() {
    popupCalculate.addClass('open');
    $('body').addClass('overflow-hidden');
  }

  function closeCalculate() {
    popupCalculate.removeClass('open');
    $('body').removeClass('overflow-hidden');
  }

  var aboutContentTabsContainer = $('.about-content__tabs');
  var aboutContentTabsMenu = aboutContentTabsContainer.find('.about-content__tabs__menu');
  var aboutContentTabs = aboutContentTabsContainer.find('.about-content__tabs__menu li');
  var aboutContentTabsContent = aboutContentTabsContainer.find('.about-content__tabs__item');
  var aboutContentTabsPrev = aboutContentTabsContainer.find('.about-content__tabs__btn__left');
  var aboutContentTabsNext = aboutContentTabsContainer.find('.about-content__tabs__btn__right');

  if (!!aboutContentTabs.length && !!aboutContentTabsContent.length) {
    var indexCurrent = 0;
    var currentClass = 'current';

    var selectTabs = function selectTabs(index) {
      aboutContentTabs.removeClass(currentClass);
      aboutContentTabsContent.removeClass(currentClass);
      $(aboutContentTabs[index]).addClass(currentClass);
      $(aboutContentTabsContent[index]).addClass(currentClass);
    };

    aboutContentTabs.on('click', function () {
      var index = $(this).index();
      selectTabs(index);
      return false;
    });
    aboutContentTabsNext.on('click', function () {
      var oldScrollLeft = aboutContentTabsMenu.scrollLeft();
      var newScrollLEft = oldScrollLeft + 100;
      aboutContentTabsMenu.scrollLeft(newScrollLEft);
      return false;
    });
    aboutContentTabsPrev.on('click', function () {
      var oldScrollLeft = aboutContentTabsMenu.scrollLeft();
      var newScrollLEft = oldScrollLeft + 100;
      aboutContentTabsMenu.scrollLeft(oldScrollLeft - 100);
      return false;
    });
    aboutContentTabsMenu.on('scroll', function (e) {
      if (e.target.scrollLeft > 0) {
        aboutContentTabsPrev.addClass('current');
      } else {
        aboutContentTabsPrev.removeClass('current');
      }
    });
  }

  var articlesSmart = $('.articles-smart-slider');
  var articlesSmartPrev = $('.articles-smart-slider__btn__left');
  var articlesSmartNext = $('.articles-smart-slider__btn__right');

  if (!!articlesSmart.length && !!articlesSmart.length) {
    articlesSmartNext.on('click', function () {
      var oldScrollLeft = articlesSmart.scrollLeft();
      var newScrollLEft = oldScrollLeft + 100;
      articlesSmart.scrollLeft(newScrollLEft);
      return false;
    });
    articlesSmartPrev.on('click', function () {
      var oldScrollLeft = articlesSmart.scrollLeft();
      var newScrollLEft = oldScrollLeft - 100;
      articlesSmart.scrollLeft(newScrollLEft);
      return false;
    });
    articlesSmart.on('scroll', function (e) {
      if (e.target.scrollLeft > 0) {
        articlesSmartPrev.addClass('current');
      } else {
        articlesSmartPrev.removeClass('current');
      }
    });
  }

  $('.js-mobile-showall').on('click', function () {
    if ($(window).width() <= 480) {
      $('.experts-filter__list__category--mobile').toggleClass('open');
    }

    return false;
  }); // let stepIndex = 0;
  // const calculatorSteps = $('.calculator__steps__item');
  // $('.js-steps-next').on('click', () => {
  //   stepIndex = stepIndex+1;
  //   calculatorSteps.removeClass('current');
  //   console.log('calculatorSteps', calculatorSteps[stepIndex]);
  //   return false;
  // });
  // const element = document.getElementById('phonefield');
  // const maskOptions = {
  //     mask: '+{7} (000) 000-00-00',
  //     prepare: (appended, masked) => {
  //         if ((appended === '8' || appended === '7' || appended === '+' || appended === '+7') && masked.value === '') {
  //             return '';
  //         }
  //         return appended;
  //     }
  // };
  // if (!!element) IMask(element, maskOptions);

  /* 
  const initCalculatorForm = () => {
    let step = 0;
    const countSteps = 3;
    const $container = $('#calculatorContainer');
    if (!$container.length) return false;
      const $btnNext = $container.find('.js-steps-next');
    const $btnSubmit = $container.find('.js-steps-submit');
    const $steps = $container.find('.calculator__steps__item');
    const $stepInfo = $('.calculator__progress__info');
    const $percentInfo = $('.calculator__progress__procents');
    const $progressSteps = $('.calculator__progress__line__grey');
    const $pregressInfo = $('.calculator__progress__line__green');
    const $menu = $('.calculator__steps-menu li');
      $btnNext.on('click', (item) => {
      if (getStep() === countSteps) return false;
        if (!!$(item.target).attr('required') && !validateStep()) return false;
        step++;
      setMenuCurrent();
      setStepCurrent();
        setInfo();
      setProgressSteps();
        return false;
    });
      $btnSubmit.on('click', (e) => {
      e.preventDefault();
      if (!validateStep()) return false;
        createOrder('form#calculatorForm');
        return false;
    });
    var validator = $('#calculatorForm').validate({
      onsubmit: false,
      rules: {
        email: {
          required: true,
          email: true,
        },
        name: {
          required: true,
          minlength: 2,
        },
        phone: {
          required: true,
          minlength: 2,
          maxlength: 20,
        },
        theme: {
          required: true,
          minlength: 2,
        },
        type_of_work_raw: {
          required: true,
        },
      },
      submitHandler: function (form) {
        createOrder(form);
      },
      errorElement: 'span',
      errorPlacement: function (error, element) {
        var data = element.data('selectric');
        error.appendTo(
          data
            ? element.closest('.' + data.classes.wrapper).parent()
            : element.parent()
        );
      },
      highlight: function (element) {
        if (element.type === 'select-one') {
          $(element).parent().parent().addClass('error');
        } else if (element.type === 'hidden') {
          $(element).parent().addClass('error');
        } else {
          $(element).addClass('error');
        }
      },
      unhighlight: function (element) {
        if (element.type === 'select-one') {
          $(element).parent().parent().removeClass('error');
        } else if (element.type === 'hidden') {
          $(element).parent().removeClass('error');
        } else {
          $(element).removeClass('error');
        }
      },
    });
      const validateStep = () => {
      const $stepContainer = $($steps[step]);
      const $requireds = $stepContainer.find('.js-required');
      console.log($('#calculatorForm').valid());
      console.log(validator);
      let errors = {};
        validator.errorList.forEach(
        (error) => (errors[error.element.name] = true)
      );
        // var form
      // const errors = form.errorsList;
      let errorsInStep = false;
        if (!$requireds.length) return true;
        $requireds.each((index, element) => {
        const elem = $stepContainer.find('[name=' + element.name + ']');
        if (typeof errors !== 'undefined') {
          if (!!errors[element.name]) {
            elem.addClass('error');
            errorsInStep = true;
          } else {
            elem.removeClass('error');
          }
        } else {
          errorsInStep = false;
        }
      });
        return !errorsInStep;
    };
      const getStep = () => {
      return step + 1;
    };
      const getPercentStep = () => {
      return Math.floor(getStep() * (100 / countSteps));
    };
      const getPercentInfo = () => {
      return (getStep() - 1) * Math.floor(100 / countSteps);
    };
      const setInfo = () => {
      $stepInfo.html('+33% за ' + getStep() + 'й шаг');
      $percentInfo.html(getPercentInfo());
    };
      const setProgressSteps = () => {
      $progressSteps.css({ width: getPercentStep() + '%' });
      $pregressInfo.css({ width: getPercentInfo() + '%' });
    };
      const setMenuCurrent = () => {
      $($menu[step]).addClass('current');
    };
      const setStepCurrent = () => {
      $steps.removeClass('current');
      $($steps[step]).addClass('current');
    };
  }; */

  initCalculatorForm();
  $('#file-upload').on('change', function () {
    var files = $(this)[0].files;
    var list = $('#file-upload-list');

    if (!!files.length) {
      Array.from(files).forEach(function (file) {
        list.append($('<div class="form__files__item">' + file.name + '</div>'));
      });
    }
  });
  $('select.form__field.validate').on('selectric-change', function (event, element, selectric) {
    $(this).valid();
  });
  var starElement = $('.reviews__item__rating span');
  starElement.on('mouseover', function () {
    var onStar = parseInt($(this).data('value'), 10);
    $(this).parent().children('span').each(function (e) {
      if (e < onStar) {
        $(this).addClass('current');
      } else {
        $(this).removeClass('current');
      }
    });
  }).on('mouseout', function () {
    $(this).parent().children('span').each(function (e) {
      $(this).removeClass('current');
    });
  });
  starElement.on('click', function () {
    var onStar = parseInt($(this).data('value'), 10);
    var stars = $(this).parent().children('span');

    for (var i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass('active');
    }

    for (var i = 0; i < onStar; i++) {
      $(stars[i]).addClass('active');
    }

    var ratingValue = parseInt($('.reviews__item__rating span.current').last().data('value'), 10);
    $('#review_rating').val(ratingValue).valid();
  });
  $('.btn-load-reviews').on('click', function () {
    var _this = $(this);

    _this.html('Загрузка...'); // изменение кнопки


    var data = {
      action: 'loadmore',
      query: _this.attr('data-param-posts'),
      page: this_page,
      tpl: _this.attr('data-tpl')
    };
    $.ajax({
      url: '/wp-admin/admin-ajax.php',
      data: data,
      type: 'POST',
      success: function success(data) {
        if (data) {
          _this.html('Показать ещё');

          $('#reviewsList').append(data); // где вставить данные

          this_page++; // увелич. номер страницы +1

          if (this_page == _this.attr('data-max-pages')) {
            _this.remove(); // удаляем кнопку, если последняя стр.

          }
        } else {
          // если закончились посты
          _this.remove(); // удаляем кнопку

        }
      }
    });
  });
});