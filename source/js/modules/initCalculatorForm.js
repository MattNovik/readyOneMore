import createOrder from "./createOrder";

const initCalculatorForm = () => {
  let step = 0;
  const countSteps = 3;
  const $container = $("#calculatorContainer");
  if (!$container.length) return false;

  const $btnNext = $container.find(".js-steps-next");
  const $btnSubmit = $container.find(".js-steps-submit");
  const $steps = $container.find(".calculator__steps__item");
  const $stepInfo = $(".calculator__progress__info");
  const $percentInfo = $(".calculator__progress__procents");
  const $progressSteps = $(".calculator__progress__line__grey");
  const $pregressInfo = $(".calculator__progress__line__green");
  const $menu = $(".calculator__steps-menu li");
  const $buttonsNextSubmit = $(".calculator__button-wrapper button");

  $btnNext.on("click", (item) => {
    if (getStep() === countSteps) return false;

    if (!!$(item.target).attr("required") && !validateStep()) return false;
    console.log('heree')
    step++;
    setMenuCurrent();
    setStepCurrent();

    setInfo();
    setProgressSteps();

    return false;
  });

  $btnSubmit.on("click", (e) => {
    e.preventDefault();
    if (!validateStep()) return false;

    createOrder("form#calculatorForm");

    return false;
  });

  const validator = $("#calculatorForm").validate({
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
      agreement: {
        required: true,
      },
    },
    submitHandler: function (form) {
      createOrder(form);
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      var data = element.data("selectric");
      error.appendTo(data ? element.closest("." + data.classes.wrapper).parent() : element.parent());
    },
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

  const validateStep = () => {
    const $stepContainer = $($steps[step]);
    const $requireds = $stepContainer.find(".js-required");
    console.log($("#calculatorForm").valid());
    console.log(validator);
    let errors = {};

    validator.errorList.forEach((error) => (errors[error.element.name] = true));

    // var form
    // const errors = form.errorsList;
    let errorsInStep = false;

    if (!$requireds.length) return true;

    $requireds.each((index, element) => {
      const elem = $stepContainer.find("[name=" + element.name + "]");
      if (typeof errors !== "undefined") {
        if (!!errors[element.name]) {
          elem.addClass("error");
          errorsInStep = true;
        } else {
          elem.removeClass("error");
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
    $stepInfo.html("+33% за " + getStep() + "й шаг");
    $percentInfo.html(getPercentInfo());
  };

  const setProgressSteps = () => {
    $progressSteps.css({ width: getPercentStep() + "%" });
    $pregressInfo.css({ width: getPercentInfo() + "%" });
  };

  const setMenuCurrent = () => {
    $($menu[step]).addClass("current");
  };

  const setStepCurrent = () => {
    $steps.removeClass("current");
    $buttonsNextSubmit.removeClass("current");
    $($steps[step]).addClass("current");
    if (step === 0) {
      $($buttonsNextSubmit[step]).addClass("current");
    } else if (step === 1) {
      $($buttonsNextSubmit[0]).addClass("current");
      $($buttonsNextSubmit[1]).addClass("current");
    } else if (step === 2) {
      $($buttonsNextSubmit[step]).addClass("current");
    }
  };
};

export default initCalculatorForm;
