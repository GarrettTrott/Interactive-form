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
  }
});
