const initScript = () => {
  const $modalCO = $('#createOrder');
  const popupDownload = $('#popup-download');
  const LK_USER = null;

  $modalCO.find('#new-order-email').on('input', function () {
    if (this.checkValidity()) {
      $(this).removeClass('is-invalid');
    } else {
      $(this).addClass('is-invalid');
    }
  });

  function openLoader() {
    document.querySelector('#loaderPopup').classList.add('show');
    document.querySelector('body').style.overflow = 'hidden';
  }

  function closeLoader() {
    document.querySelector('#loaderPopup').classList.remove('show');
    document.querySelector('body').style.overflow = 'visible';
  }

  function loadLKUserInfo(userData) {
    if (!userData) {
      $('.js-profile-link').html('Личный кабинет');
    } else {
      LK_USER = userData;
      $('.js-profile-link').html(userData.name).attr('href', userData.link);
    }
  }

  function createOrder(orderId, theme) {
    // $("#popup-download").modal({backdrop: 'static', keyboard: false});
    popupDownload.find('.js-theme').html(theme);
    popupDownload.data('orderId', orderId);

    // if (LK_USER) {
    //     makeOrder(orderId, LK_USER.email);
    //     return;
    // }

    popupDownload.find('.js-message').hide();
    popupDownload.find('.modal-footer, .close, .js-email').show();
  }

  function createOrderFromModal() {
    var email = popupDownload.find('#new-order-email')[0];
    if (!email.checkValidity()) {
      return;
    }
    var submitBtn = popupDownload.find('button[type="submit"]');
    submitBtn.prop('disabled', true);
    makeOrder(popupDownload.data('orderId'), email.value);
    submitBtn.prop('disabled', false);
  }

  function makeOrder(orderId, email) {
    popupDownload.find('.modal-footer, .close, .js-email').hide();
    popupDownload.find('.js-message').html('Загрузка...').show();

    $.post(
      '/gotovye-raboty/make/',
      { orderId: orderId, email: email },
      function (res) {
        console.log(res);
        if (res && res.status && res.redirect) {
          window.location.href = res.redirect;
        } else {
          popupDownload.find('.modal-footer, .close').show();
          popupDownload
            .find('.js-message')
            .html(
              res && res.error
                ? res.error
                : 'Произошла ошибка, повторите попытку!'
            )
            .show();
          closeLoader();
        }
        console.log(res);
      },
      'json'
    ).fail(function (e) {
      closeLoader();
      console.error(e);
      popupDownload.find('.modal-footer, .close').show();
      popupDownload
        .find('.js-message')
        .html('Произошла ошибка, повторите попытку!')
        .show();
    });
  }

  $(function () {
    $('.selectize').select2({
      theme: 'flat',
      width: 'resolve',
      language: 'ru',
    });

    function sendToCrmHandler(form) {
      var submitBtn = $(form).find('button[type="submit"]');
      submitBtn.prop('disabled', true);
      $.post(
        '/gotovye-raboty/sendForm/',
        $(form).serialize(),
        function (res) {
          if (typeof res.link !== 'undefined') {
            window.location.href = res.link + '/newOrderId=' + res.order_id + '/';
          } else {
            window.location.href = 'https://studservis-lk.ru/orders/edit/';
          }
          console.log(res);
        },
        'json'
      ).fail(function (e) {
        console.log(e);
        closeLoader();
        alert('Произошла ошибка');
        // window.location.reload();
      });
      submitBtn.prop('disabled', false);
    }

    $('.sendToCrm').each(function () {
      $(this).validate({
        rules: {
          theme: 'required',
          email: {
            required: true,
            email: true,
          },
          typeOfWork: {
            required: true,
          },
          agree: {
            required: true,
          },
        },
        messages: {
          typeOfWork: 'Заполните поле "Тип работы"',
          theme: 'Заполните поле "Тема работы"',
          email: {
            required: 'Поле email обязательно для заполнения',
            email: 'Введите корректный email',
          },
          agree: {
            required: 'Подтвердите согласие на обработку персональных данных',
          },
        },
        errorPlacement: function (error, element) {
          if (element.attr('name') == 'agree') {
            $('.popup__term-error').html(error);
          } else {
            error.insertAfter(element);
          }
        },
        submitHandler: function (form) {
          // for demo
          openLoader();
          sendToCrmHandler(form);

          return false;
        },
      });
    });
    $('.sendToCrmTop').validate({
      errorLabelContainer: $('.sendToCrmTop .error-block'),

      rules: {
        theme: 'required',
        email: {
          required: true,
          email: true,
        },
        agree: {
          required: true,
        },
      },
      messages: {
        theme: 'Заполните поле "Тема работы"',
        email: {
          required: 'Поле email обязательно для заполнения',
          email: 'Введите корректный email',
        },
        agree: {
          required: 'Подтвердите согласие на обработку персональных данных',
        },
      },
      submitHandler: function (form) {
        // for demo
        openLoader();
        sendToCrmHandler(form);
        return false;
      },
    });
    $('.sendToCrmFromMain').validate({
      errorLabelContainer: $('.sendToCrmFromMain .error-block'),
      rules: {
        theme: 'required',
        email: {
          required: true,
          email: true,
        },
        typeOfWork: {
          required: true,
        },
        agree: {
          required: true,
        },
      },
      messages: {
        theme: 'Заполните поле "Тема работы"',
        email: {
          required: 'Поле email обязательно для заполнения',
          email: 'Введите корректный email',
        },
        typeOfWork: {
          required: 'Поле "Тип работы" обязательно для заполнения',
        },
        agree: {
          required: 'Подтвердите согласие на обработку персональных данных',
        },
      },
      submitHandler: function (form) {
        // for demo
        openLoader();
        sendToCrmHandler(form);
        return false;
      },
    });
    $('.sendToCrmSubscribe').validate({
      errorLabelContainer: $('.sendToCrmSubscribe .error-block'),
      rules: {
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        email: {
          required: 'Поле email обязательно для заполнения',
          email: 'Введите корректный email',
        },
      },
      submitHandler: function (form) {
        // for demo
        openLoader();
        sendToCrmHandler(form);
        return false;
      },
    });
  });
};

export default initScript;
