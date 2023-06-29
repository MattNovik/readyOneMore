"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.createOrder = createOrder;

function createOrder(form) {
  var formArray = $(form).serializeArray();
  var filesArray = $(form).find("#file-upload");
  var formData = new FormData();
  openLoaderPopup($("#loaderPopup"));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
      var _iterator = formArray[Symbol.iterator](), _step;
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      _iteratorNormalCompletion = true
    ) {
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
      formData.append("files[]", file);
    });
  }

  ym(MainSettings.metrika, "reachGoal", "raschet"); // console.log(new FormData();

  $.ajax({
    // инициализируем ajax запрос
    type: "POST",
    // в каком формате отправляем
    url: "/wp-content/themes/studservice/ajax/createOrder.php",
    // путь до обработчика, у нас он лежит в той же папке
    data: formData,
    // данные для отправки
    dataType: "json",
    processData: false,
    cache: false,
    contentType: false,
    success: function success(response) {
      if (typeof response.link !== "undefined" && response.link.length > 0) {
        return (window.location.href = response.link);
      }

      if (response.order_id && response.action === "userIsset") {
        return (window.location.href =
          MainSettings.lk_url +
          "orders/newOrder/id=" +
          response.order_id +
          "/new/");
      } else {
        return (window.location.href = MainSettings.lk_url);
      }
    },
    error: function error(xhr, status, _error) {
      closeLoaderPopup($("#loaderPopup"));
      alert("Ошибка отправки");
      return false;
    },
  });
  return false;
}
