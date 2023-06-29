const createSelectsOptions = () => {
  const $singleService = $(".single-service h1");

  if ($singleService.length > 0) {
    const $selectWorkItem = $(
      "select[name=type_of_work_raw].set-default option[value='" + $singleService.attr("data-name") + "']"
    );
    const $selectedIndex = $selectWorkItem.index();
    $("select[name=type_of_work_raw].set-default")
      .prop("selectedIndex", $selectedIndex)
      .selectric("refresh")
      .selectric("open")
      .selectric("close");
  }

  $("#type_of_works_select").on("change", function () {
    const priceStr = $("select#type_of_works_select option:selected").data("price");
    const arr = priceStr.split("/");
    $(".footer__popup__content__price i").text(arr[0] + " *");
  });

  $("select:not(.clear-select)").selectric({
    maxHeight: 200,
    nativeOnMobile: true,
  });

  $("select.form__field.validate").on("selectric-change", function (event, element, selectric) {
    $(this).valid();
  });
};

export default createSelectsOptions;
