$(document).ready(function () {
// Navbar Links Style Change
$('.main-nav .nav-item .nav-link').click(function () {
  $(this).parent().addClass('active').siblings().removeClass('active');
})

//Tasks-nav tabs
$('.tasks-nav a').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
})

// Regiser Page
$('.tabs .reg-btn').click(function () {
  $('.reg').fadeIn(300).siblings().fadeOut(300);
  $('.reg-btn a').addClass('active');
  $('.terms-btn a').removeClass('active');
})
$('.tabs .terms-btn').click(function () {
  $('.terms').fadeIn(300).siblings().fadeOut(300);
  $('.terms-btn a').addClass('active');
  $('.reg-btn a').removeClass('active');
})

//Transaction-show button
$('.show-btn').click(function () {
  $('.popup-page').fadeIn(200);
  $('.transaction-show').slideDown(400);
  $('body').addClass('noscroll');
})
//Transaction-show button
$('.follow-btn').click(function () {
  $('.popup-page').fadeIn(200);
  $('.transaction-follow').slideDown(400);
  $('body').addClass('noscroll');
})
//Transaction-refer button
$('.refer-btn').click(function () {
  $('.popup-page').fadeIn(200);
  $('.transaction-refer').slideDown(400);
  $('body').addClass('noscroll');
})
//Transaction-link button
$('.link-btn').click(function () {
  $('.popup-page').fadeIn(200);
  $('.transaction-link').slideDown(400);
  $('body').addClass('noscroll');
})
//Transaction-storage button
$('.storage-btn').click(function () {
  $('.popup-page').fadeIn(200);
  $('.transaction-storage').slideDown(400);
  $('body').addClass('noscroll');
})
//Transaction-save button
$('.save-btn').click(function () {
  $('.popup-page').fadeIn(200);
  $('.transaction-save').slideDown(400);
  $('body').addClass('noscroll');
})
//Close Popup
$('.close-popup').click(function () {
  $('.popup-page').fadeOut(200);
  $('.transaction-show').slideUp(100);
  $('.transaction-follow').slideUp(100);
  $('.transaction-refer').slideUp(100);
  $('.transaction-link').slideUp(100);
  $('.transaction-storage').slideUp(100);
  $('.transaction-save').slideUp(100);
  $('body').removeClass('noscroll');
})
//Transaction Refer Tabs
$('.refer-nav a').click(function () {
  $(this).addClass('active').siblings().removeClass('active')
})
$('.to-place-btn').click(function () {
  $('.to-employee-form').fadeOut(100);
  $('.to-place-form').fadeIn(200);
})
$('.to-emp-btn').click(function () {
  $('.to-place-form').fadeOut(100);
  $('.to-employee-form').fadeIn(200);
})
// Navbar Links Style Change
$('.main-nav .nav-item .nav-link').click(function () {
  $(this).parent().addClass('active').siblings().removeClass('active');
})

//Tasks-nav tabs
$('.tasks-nav a').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
})

// Regiser Page
$('.tabs .reg-btn').click(function () {
  $('.reg').fadeIn(300).siblings().fadeOut(300);
  $('.reg-btn a').addClass('active');
  $('.terms-btn a').removeClass('active');
})
$('.tabs .terms-btn').click(function () {
  $('.terms').fadeIn(300).siblings().fadeOut(300);
  $('.terms-btn a').addClass('active');
  $('.reg-btn a').removeClass('active');
})

//Users Page - Table Search

$(".search").keyup(function () {
  var searchTerm = $(".search").val();
  var listItem = $('.results tbody').children('tr');
  var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

  $.extend($.expr[':'], {
    'containsi': function (elem, i, match, array) {
      return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
  });

  $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function (e) {
    $(this).attr('visible', 'false');
  });

  $(".results tbody tr:containsi('" + searchSplit + "')").each(function (e) {
    $(this).attr('visible', 'true');
  });

  var jobCount = $('.results tbody tr[visible="true"]').length;
  $('.counter').text(jobCount + ' item');

  if (jobCount == '0') {
    $('.no-result').show();
  } else {
    $('.no-result').hide();
  }
});   

  //Accorion In Courses Page - Added in 14/9/2020
  $(".accord").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    var target = $(this).data("target");
    $(target).slideToggle(200);
  });
  //End new code
});
