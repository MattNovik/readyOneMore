const popupRequestСall = $("#popupRequestСall");
const popupRequestOrder = $("#popupRequestOrder");
const popupRequestReviews = $("#popupRequestReviews");
const popupRequestCity = $("#popupRequestCity");
const popupCalculate = $("#popupCalculate");

function openRequestСall() {
  popupRequestСall.addClass("open");
  $("body").addClass("overflow-hidden");
}

function closeRequestСall() {
  popupRequestСall.removeClass("open");
  $("body").removeClass("overflow-hidden");
}

function openRequestOrder() {
  popupRequestOrder.addClass("open");
  $("body").addClass("overflow-hidden");
}

function closeRequestOrder() {
  popupRequestOrder.removeClass("open");
  $("body").removeClass("overflow-hidden");
}

function openRequestReviews() {
  popupRequestReviews.addClass("open");
  $("body").addClass("overflow-hidden");
}

function closeRequestReviews() {
  popupRequestReviews.removeClass("open");
  $("body").removeClass("overflow-hidden");
}

function openRequestCity() {
  popupRequestCity.addClass("open");
  $("body").addClass("overflow-hidden");
}

function closeRequestCity() {
  popupRequestCity.removeClass("open");
  $("body").removeClass("overflow-hidden");
}

function openCalculate() {
  popupCalculate.addClass("open");
  $("body").addClass("overflow-hidden");
}

function closeCalculate() {
  popupCalculate.removeClass("open");
  $("body").removeClass("overflow-hidden");
}

const initPopupHandlers = () => {
  $(".js-openrequestcall").on("click", () => {
    openRequestСall();
  });

  $(".js-closerequestcall").on("click", () => {
    closeRequestСall();
  });

  $(".js-openrequestorder").on("click", () => {
    openRequestOrder();
  });

  $(".js-closerequestorder").on("click", () => {
    closeRequestOrder();
  });

  $(".js-openrequestreviews").on("click", () => {
    openRequestReviews();
  });

  $(".js-closerequestreviews").on("click", () => {
    closeRequestReviews();
  });

  $(".js-openrequestcity").on("click", () => {
    openRequestCity();
  });

  $(".js-closerequestcity").on("click", () => {
    closeRequestCity();
  });

  $(".js-opencalculate").on("click", () => {
    openCalculate();
  });

  $(".js-closecalculate").on("click", () => {
    closeCalculate();
  });
};

export {
  openRequestСall,
  closeRequestСall,
  openRequestOrder,
  closeRequestOrder,
  openRequestReviews,
  closeRequestReviews,
  openRequestCity,
  closeRequestCity,
  openCalculate,
  closeCalculate,
  initPopupHandlers,
};
