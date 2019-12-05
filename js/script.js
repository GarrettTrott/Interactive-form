// Focus on first input - name input.
$("#name").focus();

// Hide other job role input
$("#other-title").hide();

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

$('[type="checkbox"]').change(function() {
  let totalCost = 0;
  $("input[type=checkbox]:checked").each(function() {
    totalCost += parseInt($(this).attr("data-cost"));
  });
  $("#total").text(totalCost);
});
