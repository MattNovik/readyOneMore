import createOrder from "./createOrder";

const initCalculateFormValidate = () => {
  const calculateForm = $("#calculateForm");
  calculateForm.validate({
    rules: {
      type_of_work: {
        required: true,
      },
      theme: {
        required: true,
      },
      email: {
        email: true,
        required: true,
      },
      agreement: {
        required: true,
      },
    },
    messages: {
      type_of_work: {
        required: "Укажите тип работы",
      },
      theme: {
        required: "Укажите тему работы",
      },
      email: {
        email: "Введите корректный email",
        required: "Укажите Ваш email",
      },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      const data = element.data("selectric");
      if (data) {
        error.appendTo(element.closest("." + data.classes.wrapper).parent());
      } else {
        error.insertBefore(element);
      }
    },
    submitHandler: function (form) {
      createOrder(form);
    },
    /*     invalidHandler: function () {
      $("#calculateForm button:submit").addClass("form-error-btn");
    },
    submitHandler: function () {
      $("#calculateForm button:submit").removeClass("form-error-btn");
    }, */
    highlight: function (element) {
      if (element.type === "select-one") {
        $(element).parent().parent().addClass("error");
      } else if (element.type === "hidden") {
        $(element).parent().addClass("error");
      } else {
        $(element).addClass("error");
      }
    },
    unhighlight: function (element) {
      if (element.type === "select-one") {
        $(element).parent().parent().removeClass("error");
      } else if (element.type === "hidden") {
        $(element).parent().removeClass("error");
      } else {
        $(element).removeClass("error");
      }
    },
  });
};

export default initCalculateFormValidate;
