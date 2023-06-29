const createOwlCarouselReviews = () => {
  const $reviewsslider = $(".js-carousel");

  $reviewsslider.owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    nav: false,
    dots: false,
    autoplayTimeout: 7000,
    responsive: {
      0: {
        items: 1,
        autoHeight: true,
        slideBy: 1,
      },
      768: {
        items: 1,
        slideBy: 1,
      },
      1024: {
        items: 2,
        slideBy: 2,
      },
    },
  });

  $(".js-carousel-prev").on("click", () => {
    $reviewsslider.trigger("prev.owl.carousel");
  });

  $(".js-carousel-next").on("click", () => {
    $reviewsslider.trigger("next.owl.carousel");
  });
};

export default createOwlCarouselReviews;
