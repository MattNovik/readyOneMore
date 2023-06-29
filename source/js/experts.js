import 'bootstrap/dist/js/bootstrap.bundle.js';

$(document).ready(function () {
  var $window = $(window);
  function submitFilter(form) {
    console.log(form);
    $.ajax({
      url: form.attr('action'),
      data: form.serialize(), // form data
      type: form.attr('method'), // POST
      beforeSend: function (xhr) {
        // filter.find('button').text('Processing...'); // changing the button label
      },
      success: function (data) {
        // filter.find('button').text('Apply filter'); // changing the button label back
        $('#expertsList').html(data); // insert data
      },
    });
  }
  $('.checkbox-checked-all').on('click', function () {
    if (!$(this).is(':checked')) {
      $(this).prop('checked', true);
      return false;
    }
    check($(this), 'checked');
  });

  $('.checkbox-clear-all').on('click', function () {
    check($(this), 'clear');
  });

  $('.checkbox-show-all').on('click', function () {
    var $parent = $(this).parents('form');
    var $hides = $parent.find('.hide');

    $hides.show(300);
    $(this).hide(300);
  });

  $('input[type="checkbox"]').on('change', function () {
    check($(this), 'check');
  });

  var $categories = $('.experts-filter__list__category');

  $categories.on('click', '.experts-filter__list__category__name', function () {
    if (!$(this).parent().hasClass('current')) {
      $categories.removeClass('current');
      $(this).parent().addClass('current');
    } else {
      $categories.removeClass('current');
    }
  });

  function check(el, type) {
    var $parent = $(el).parents('div.experts-filter__checkboxes__list');
    var $form = $('#expertFilter');
    var $checkboxs = $parent.find('input[type="checkbox"]');
    var $checkboxsSelected = $parent.find('input[type="checkbox"]:checked');
    var $clearBtn = $parent.find('.checkbox-clear-all');
    var $checkAll = $parent.find('.checkbox-checked-all');

    switch (type) {
      case 'checked':
        $checkboxs.prop('checked', true);
        submitFilter($form);
        $clearBtn.addClass('active');
        break;
      case 'clear':
        $checkboxs.prop('checked', false);
        submitFilter($form);
        $clearBtn.removeClass('active');
        break;
      case 'check':
        if (!!$checkboxsSelected.length) {
          $clearBtn.addClass('active');
        } else {
          $clearBtn.removeClass('active');
        }
        submitFilter($form);
        break;
      default:
        break;
    }
  }
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip({
    customClass: 'expert-tooltip',
  });
});
