const closeLoaderPopup = (popup) => {
  popup.removeClass("open");
  $("body").removeClass("overflow-hidden");
};

export default closeLoaderPopup;
