const initCustom = () => {
  $(document).ready(function () {

    $(".search__popular span").on('click', function (e) {
      $('.search__input_main').val(($(this).text()));
    });
    $(".carousel__more").click(function () {
      if ($(".carousel__more").text() == "Показать больше") {
        $(".carousel__content").css("max-height", "8000px");
        $(".carousel__more").text("скрыть");
      } else {
        $(".carousel__content").css("max-height", "1300px");
        $(".carousel__more").text("Показать больше");
      }
    });

    $(".open-modal").click(function () {
      let heightH1 = $(".promo__title.title.title_h1").height();
      if ($(".switch_modal").hasClass("open")) {
        $(".switch_modal").removeClass("open");
        $(".switch_modal").css("top", "-99999px");
      } else {
        $(".switch_modal").addClass("open");
        $(".switch_modal").css("top", `${heightH1}px`);
      }
    });


    $(".modal").each(function () {
      $(this).wrap('<div class="overlay"></div>')
    });

    $(document).mouseup(function (e) {
      var popup = $(".hamburger__list");
      var modal = $(".switch_modal");
      if (!$('.hamburger__list.show').is(e.target) && !popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.removeClass('show');
      }
      if (!$('.switch_modal.open').is(e.target) && !modal.is(e.target) && modal.has(e.target).length == 0) {
        modal.removeClass('open');
      }
    });
    $(".open-modal").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation;

      var $this = $(this),
        modal = $($this).data("modal");

      $(modal).parents(".overlay").addClass("open");
      setTimeout(function () {
        $(modal).addClass("open");
      }, 350);

      $(document).on('click', function (e) {
        var target = $(e.target);

        if ($(target).hasClass("overlay")) {
          $(target).find(".modal").each(function () {
            $(this).removeClass("open");
          });
          setTimeout(function () {
            $(target).removeClass("open");
          }, 350);
        }

      });

    });

    $(".close-modal").on('click', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation;

      var $this = $(this),
        modal = $($this).data("modal");

      $(modal).removeClass("open");
      setTimeout(function () {
        $(modal).parents(".overlay").removeClass("open");
      }, 350);

    });


    //300 руб на первый заказ
    $(document).on('change', '.form__select', function () {
      ym(46159971, "reachGoal", "WorkSelect")
    });

    //Выбор темы
    $(document).on('change', 'input[name=theme]', function () {
      ym(46159971, "reachGoal", "worktype")
    });

    //Ввод имейла
    $(document).on('change', 'input[name=email]', function () {
      ym(46159971, "reachGoal", "insertemail")
    });

    //Узнать стоимость
    $(document).on('click', '.button__text', function () {
      ym(46159971, "reachGoal", "sendform")
    });


    //Узнать стоимость
    $(document).on('change', '.search__input_main', function () {
      ym(46159971, "reachGoal", "inserttopic")
    });

    //Ввод электронной почты
    $(document).on('change', '.search__input_second', function () {
      ym(46159971, "reachGoal", "insertemail")
    });

    //Клип по кнопке "Узнать стоимость"
    $(document).on('click', '.search__button', function () {
      ym(46159971, "reachGoal", "getprice")
    });


    //Клип по "Скачать в 1 клик"
    $(document).on('click', '.goods__button', function () {
      ym(46159971, "reachGoal", "oneclick")
    });

    //Ввод электронной почты
    $(document).on('change', '.popup__input', function () {
      ym(46159971, "reachGoal", "insertemail")
    });

    //Клик по кнопке "Скачать"
    $(document).on('click', '.button_text', function () {
      ym(46159971, "reachGoal", "clickdownload")
    });


    //Ввод электронной почты
    $(document).on('change', '.form__input', function () {
      ym(46159971, "reachGoal", "insertemail")
    });


    //Клик по кнопке "Узнать скидку"
    $(document).on('click', '.button_color-pink', function () {
      ym(46159971, "reachGoal", "getsale")
    });

  });
};

export default initCustom;

