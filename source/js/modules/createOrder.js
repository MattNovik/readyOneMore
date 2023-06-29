import closeLoaderPopup from "./closeLoderPopup";
import openLoaderPopup from "./openLoaderPopup";
import MainSettings from "../data/mainSettings";

const createOrder = (form) => {
  const getCookie = (name) => {
    var matches = document.cookie.match(
      new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
  const formArray = $(form).serializeArray();
  let filesArray = $(form).find("#file-upload");
  const formData = new FormData();
  openLoaderPopup($("#loaderPopup"));
  for (let elem of formArray) {
    formData.append(elem.name, elem.value);
  }
  if (getCookie("label_id")) {
    formData.append("label_id", getCookie("label_id"));
  }

  if (!!filesArray.length) {
    filesArray = filesArray[0].files;
    Array.from(filesArray).forEach((file) => {
      formData.append("files[]", file);
    });
  }
  ym(MainSettings.metrika, "reachGoal", "raschet");
  $.ajax({
    // инициализируем ajax запрос
    type: "POST", // в каком формате отправляем
    url: "/wp-content/themes/studservice/ajax/createOrder.php", // путь до обработчика, у нас он лежит в той же папке
    data: formData, // данные для отправки
    dataType: "json",
    processData: false,
    cache: false,
    contentType: false,
    success: function (response) {
      if (typeof response.link !== "undefined" && response.link.length > 0) {
        return (window.location.href = response.link);
      }
      if (response.order_id && response.action === "userIsset") {
        return (window.location.href = MainSettings.lk_url + "orders/newOrder/id=" + response.order_id + "/new/");
      } else {
        return (window.location.href = MainSettings.lk_url);
      }
    },
    error: function (xhr, status, error) {
      closeLoaderPopup($("#loaderPopup"));
      alert("Ошибка отправки");
      return false;
    },
  });

  return false;
};

export default createOrder;
