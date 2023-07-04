// перенесено из старой сборки, надо разобраться глубже что и для чего
// Скорей всего иницируется и запускается карусель

const initMain = () => {
  const hamburgers = document.querySelectorAll(".hamburger");
  const wrap = document.querySelector('.wrapper');
  const body = document.querySelector('body');
  const nav = document.querySelector('nav');

  function stepsCarousel() {

    var slider = $('.steps-carousel-js');

    if ($(window).width() <= 800) {

      slider.owlCarousel({
        items: 3,
        loop: true,
        nav: true,
        margin: 0,
        navText: ["<span data-dynamic='icn-arrow-r-light'>\
                    <img src='../img/icon-slider-left.png' alt=''>\
               </span>",
          "<span data-dynamic='icn-arrow-r-light'>\
                    <img src='../img/icon-slider-right.png' alt=''>\
               </span>"
        ],
        autoplayHoverPause: true,
        autoplay: false,
        dots: true,
        responsive: {
          320: {
            items: 1
          },

          480: {
            items: 1
          },

          768: {
            items: 1
          },

          1350: {
            items: 2
          },

          1500: {
            items: 1
          }
        }
      });

    } else {
      slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
    }

  }

  function cardCarousel() {

    var slider = $('.carousel__slider');

    slider.owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dotsContainer: '.tabs__list',
      margin: 0,
      autoplayHoverPause: true,
      autoplay: false,
      dots: true,
      responsive: {
        320: {
          items: 1
        },

        480: {
          items: 1
        },

        768: {
          items: 1
        },

        1350: {
          items: 1
        },

        1500: {
          items: 1
        }
      }
    });
  }

  function similarCarousel() {

    var slider = $('.similar-list-js');

    if ($(window).width() <= 1240) {

      slider.owlCarousel({
        items: 2,
        loop: true,
        nav: true,
        margin: 0,
        autoplayHoverPause: true,
        autoplay: false,
        dots: true,
        responsive: {
          320: {
            items: 1
          },

          480: {
            items: 1
          },

          768: {
            items: 1
          },

          1000: {
            items: 2
          },

          1500: {
            items: 2
          }
        }
      });

    } else {
      slider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
    }

  }

  function selectFun() {

    $('.select-js').each(function () {
      var $this = $(this),
        numberOfOptions = $(this).children('option').length;

      $this.addClass('select-hidden');
      $this.wrap('<div class="select"></div>');
      $this.after('<div class="select-styled"></div>');

      var $styledSelect = $this.next('div.select-styled');
      $styledSelect.text($this.children('option').eq(0).text());

      var $list = $('<ul />', {
        'class': 'select-options'
      }).insertAfter($styledSelect);

      for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
          text: $this.children('option').eq(i).text(),
          rel: $this.children('option').eq(i).val()
        }).appendTo($list);

      }


      var $listItems = $list.children('li');

      $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
          $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
      });

      $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
      });

      $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
      });

    });

  }

  function scrollUpPage(element) {

    var intervalId = 0;
    var scrollButton = document.querySelector('.up-js');

    function scrollToTop() {
      intervalId = setInterval(scrollStep, 10);
    }

    function scrollStep() {
      if (window.pageYOffset === 0) {
        clearInterval(intervalId);
      }
      window.scroll(0, window.pageYOffset - 50);
    }

    scrollButton.addEventListener('click', scrollToTop);
  }

  function yaMap() {

    if ($('#map').length) {

      ymaps.ready(init);
      var myMap,
        myPlacemark = [];

      function init() {
        myMap = new ymaps.Map("map", {
          center: [60.01164, 30.33908],
          zoom: 13,
          controls: ['zoomControl'],
          behaviors: ['drag']
        });

        myPlacemark[0] = new ymaps.Placemark([60.01164, 30.33908], {
          hintContent: 'Санкт – Петербург',
          balloonContentHeader: 'Проспект Тореза 68 Д',
        }, {
          iconLayout: 'default#image',
          iconImageHref: '/img/map-marker.png',
          iconImageSize: [70, 70],
          iconImageOffset: [-35, -35]
        });

        var position = myMap.getGlobalPixelCenter();
        myMap.setGlobalPixelCenter([position[0] + 0, position[1] + 0]);

        for (var i = 0; i < myPlacemark.length; i++) {
          myMap.geoObjects.add(myPlacemark[i]);
        };
      }
    }
  }

  function files() {

    (function (document, window, index) {
      var inputs = document.querySelectorAll('.form__file');
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
          labelVal = label.innerHTML,
          parent = input.parentElement;

        var close = document.createElement('button');

        input.addEventListener('change', function (e) {

          var fileName = '';
          if (this.files && this.files.length == 1) {
            // fileName = (this.getAttribute('daformta-multiple-caption') || '').replace('{count}', this.files.length);
            fileName = e.target.value.split('\\').pop();
            parent.querySelector('.file__text').innerHTML = fileName;
            parent.appendChild(close);

          } else
            fileName = e.target.value.split('\\').pop();

          if (fileName)
            parent.querySelector('.file__text').innerHTML = fileName;
          else
            parent.innerHTML = labelVal;
        });

        input.addEventListener('focus', function () { input.classList.add('has-focus'); });
        input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
      });
    }(document, window, 0));

  }


  function hamburgerMenu() {
    if (hamburgers.length > 0) {
      for (var i = 0; hamburgers.length > i; i++) {
        hamburgers[i].addEventListener('click', function () {
          wrap.classList.toggle('open-sidebar');
          this.classList.toggle('is-active');
          body.classList.toggle('overflow');
          nav.classList.toggle('show');
        });
      }
    }
  }

  function closePopups() {

    $(".popup_shade").removeClass("show");
    $(".popup").removeClass("show");
    $('body').removeClass("overflow").css('margin-right', '');
    $('.header').removeClass("overflow").css('margin-right', '');

  }

  function showPopups() {

    $(".show-popup").click(function (e) {

      e.preventDefault();

      var t = $($(this).attr("href"));
      var width = $('body').width();
      var bodyMain = $('.body-main');

      $(".popup_shade").addClass("show");

      if (body.classList.contains('body-main')) {
        $('body').css('margin-right', 0 + 'px');
        $('body').css('padding-right', 0 + 'px');
        console.log('main');
      }

      if (wrap.classList.contains('open-sidebar')) {
        wrap.classList.remove('open-sidebar');
        hamburgers[0].classList.remove('is-active');
        body.classList.remove('overflow');
        nav.classList.remove('show');
      }

      var scrollWidth = window.innerWidth - document.documentElement.clientWidth;
      var headerIsFixed = $('.header').css('position') === 'fixed';

      $('body').addClass("overflow").css('margin-right', scrollWidth + 'px');
      $('.header').addClass("overflow").css('margin-right', headerIsFixed ? scrollWidth + 'px' : '');

      if ($(this).data("item")
        && t.find('input[name="item"]').val($(this).data("item")), $(this).data("product")
        && t.find('input[name="product_type"]').val($(this).data("product")), $(this).data("item_id")
        && t.find('input[name="item_id"]').val($(this).data("item_id")), t.addClass("show"), t.find("video").length
      ) try {
        t.find("video")[0].play()
      } catch (e) {
        console.log(e)
      }

    });

    $(".popup__close-btn, .popup-close, .popup_shade").click(function (e) {
      e.preventDefault();
      closePopups();
    });

  }

  function tabs() {
    var tabTrigger = document.querySelectorAll('.tabs__item');
    var tabTrigger2 = document.querySelectorAll('.carousel__dots .owl-dot');

    if (tabTrigger) {
      tabTrigger.forEach(function (tabTrigger, index) {
        tabTrigger.addEventListener('click', function (e) {
          e.preventDefault();

          var currentTab = document.querySelector('.card__slide[data-tab-content="' + this.dataset.tabCategory + '"]');

          if (currentTab) {
            document.querySelector('.card__slide.is-open').classList.remove('is-open');
            document.querySelector('.tabs__item.tabs__item_active').classList.remove('tabs__item_active');

            if (!currentTab.classList.contains('is-open')) {
              currentTab.classList.add('is-open');
              this.classList.add('tabs__item_active');
            }
          }
        });

      });

      tabTrigger2.forEach(function (tabTrigger2, index) {
        tabTrigger2.addEventListener('click', function (e) {
          e.preventDefault();

          var currentTab = document.querySelector('.card__slide[data-tab-content="' + this.dataset.tabNav + '"]');

          if (currentTab) {
            document.querySelector('.card__slide.is-open').classList.remove('is-open');
            document.querySelector('.carousel__dots .owl-dot.active').classList.remove('active');

            if (!currentTab.classList.contains('is-open')) {
              currentTab.classList.add('is-open');
              this.classList.add('active');
            }
          }
        });

      });


    }
  }

  function rangeSlider(elementRange, inputOne, inputTwo, min, max) {

    var stepsSlider = document.querySelector(elementRange);
    var input0 = document.querySelector(inputOne);
    var input1 = document.querySelector(inputTwo);
    var inputs = [input0, input1];

    if (stepsSlider) {

      noUiSlider.create(stepsSlider, {
        start: [min, max],
        connect: true,
        range: {
          'min': min,
          'max': max
        },
        format: {
          from: function (value) {
            return parseInt(value);
          },
          to: function (value) {
            return parseInt(value);
          }
        }
      });

      stepsSlider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = values[handle];
      });

      inputs.forEach(function (input, handle) {

        input.addEventListener('change', function () {
          stepsSlider.noUiSlider.setHandle(handle, this.value);
        });

        input.addEventListener('keydown', function (e) {

          var values = stepsSlider.noUiSlider.get();
          var value = Number(values[handle]);

          // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
          var steps = stepsSlider.noUiSlider.steps();

          // [down, up]
          var step = steps[handle];

          var position;


        });
      });
    }
  }

  $(function () {
    tabs();
    selectFun();
    showPopups();
    stepsCarousel();
    similarCarousel();
    // cardCarousel();

    rangeSlider('.range__element_pages', '.range__value_min', '.range__value_max', 0, 500);
    rangeSlider('.range__element_origins', '.range__value_origins_min', '.range__value_origins_max', 0, 100);

    $('.header__hamburger').on('click', function () {
      var list = $(this).find('.hamburger__list');
      list.toggleClass('show');
    });

    if ($('.filter__title_mobile').length > 0) {
      $('.filter__title_mobile').on('click', function () {
        var hidden = $(this).siblings('.filter__hidden');
        hidden.toggleClass('show');
      })
    }

    if ($('.search-goods').length > 0) {

      $('.icon-search.title__icon').on('click', function () {
        $(this).parent().siblings('.goods__search').siblings().addClass('search-active');
        $(this).parent().siblings('.goods__search').addClass('search-show');
      });

      $('.search-goods__close').on('click', function () {
        $(this).parent().siblings().removeClass('search-active');
        $(this).parent().removeClass('search-show');
      });
    }

    $('.dropdown__button').on('click', function () {

      if ($('.dropdown__list').hasClass('show')) {
        $('.dropdown__list').removeClass('show');
      }

      else {
        $('.dropdown__list').addClass('show');
      }

    });

    $(document).mouseup(function (e) {
      var container = $('.dropdown__list');
      if (container.hasClass('show')) {
        if (container.has(e.target).length === 0) {
          container.removeClass('show');
        }
      }

    });

  });

  $(window).resize(function () {
    stepsCarousel();
    similarCarousel();
  });
};

export default initMain;
