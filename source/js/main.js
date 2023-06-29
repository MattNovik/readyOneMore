import "./vendor.js";

import { iosVhFix } from './utils/ios-vh-fix.js';
import initMain from './modules/copy/main.js';
import initCustom from './modules/copy/custom.js';
import initScript from './modules/copy/scripts.js';
import createSelectsOptions from "./modules/createSelectsOptions";
import initCalculatorForm from "./modules/initCalculatorForm";
import initCalculateFormValidate from "./modules/initCalculateFormValidate";
import createOwlCarouselReviews from './modules/createOwlCarouselReviews';
import { initPopupHandlers } from './modules/initPopupHandlers.js';
import initReviewsRating from "./modules/initReviewsRating.js";

window.addEventListener('DOMContentLoaded', () => {
  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initMain();
    initCustom();
    initScript();
    createSelectsOptions();
    initCalculatorForm();
    initCalculateFormValidate();
    createOwlCarouselReviews();
    initReviewsRating();
    initPopupHandlers()
  });
});

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
