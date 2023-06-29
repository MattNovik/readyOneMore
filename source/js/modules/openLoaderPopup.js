const openLoaderPopup = (popup) => {
  popup.addClass("open");
  $("body").addClass("overflow-hidden");
};

export default openLoaderPopup;
