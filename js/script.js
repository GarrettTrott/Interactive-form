// Focus on first input - name input.
$("#name").focus();

// Hide other job role input show when other is selected
$("#other-title").hide();

$("#title").change(function() {
  if ($(this).val() === "other") {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
});

// Hide all color options
$("#color option").each(function() {
  $(this).hide();
});

// Create "select theme" option placeholder and append to colors dropdown
const $selectTheme = $(
  '<option value="noSelection" selected>Please select a T-shirt theme</option>'
);
$("#color").prepend($selectTheme);

// hide/show correct color options for design

$("#design").change(function() {
  if ($(this).val() === "js puns") {
    $(
      '#color option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]'
    ).hide();
    $(
      '#color option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]'
    ).show();
  } else if ($(this).val() === "heart js") {
    $(
      '#color option[value="cornflowerblue"], option[value="darkslategrey"], option[value="gold"]'
    ).hide();
    $(
      '#color option[value="tomato"], option[value="steelblue"], option[value="dimgrey"]'
    ).show();
  } else {
    $("#color option").each(function() {
      $(this).hide();
    });
  }
});

// add activities hide and show
const $totalHeader = $(
  '<p>Your total price for activities is: <strong>$<span id="total">0</span><strong></p>'
);
$totalHeader.show();
$(".activities").append($totalHeader);

$('input[type="checkbox"]').change(function() {
  let totalCost = 0;
  const $time = $(this).attr("data-day-and-time");
  $("input[type=checkbox]:checked").each(function() {
    totalCost += parseInt($(this).attr("data-cost"));
  });

  $("input[type=checkbox]").each(function(index, element) {
    // element == this
  });

  $("#total").text(totalCost);
});

// payment option show / hide

$("option[value='select method']").hide();
$("option[value='credit card']").attr("selected", true);
$("#paypal").hide();
$("#bitcoin").hide();
$("#payment").change(function() {
  if ($(this).val() === "paypal") {
    $("#credit-card").hide();
    $("#paypal").show();
    $("#bitcoin").hide();
  } else if ($(this).val() === "bitcoin") {
    $("#credit-card").hide();
    $("#paypal").hide();
    $("#bitcoin").show();
  } else {
    $("#credit-card").show();
    $("#paypal").hide();
    $("#bitcoin").hide();
  }
});
