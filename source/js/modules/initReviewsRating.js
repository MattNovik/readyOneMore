const initReviewsRating = () => {
  const starElement = $(".reviews__item__rating span");
  starElement
    .on("mouseover", function () {
      var onStar = parseInt($(this).data("value"), 10);
      $(this)
        .parent()
        .children("span")
        .each(function (e) {
          if (e < onStar) {
            $(this).addClass("current");
          } else {
            $(this).removeClass("current");
          }
        });
    })
    .on("mouseout", function () {
      $(this)
        .parent()
        .children("span")
        .each(function (e) {
          $(this).removeClass("current");
        });
    });

  starElement.on("click", function () {
    var onStar = parseInt($(this).data("value"), 10);
    var stars = $(this).parent().children("span");
    for (var i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass("active");
    }

    for (var i = 0; i < onStar; i++) {
      $(stars[i]).addClass("active");
    }

    var ratingValue = parseInt($(".reviews__item__rating span.current").last().data("value"), 10);
    $("#review_rating").val(ratingValue).valid();
  });
};

export default initReviewsRating;
