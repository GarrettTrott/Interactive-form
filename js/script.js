const $selectColor = $(
  '<option value="noSelection" selected>Please select a T-shirt color</option>'
);
const $totalHeader = $(
  '<p>Your total price for activities is: <strong>$<span id="total">0</span><strong></p>'
);
const $nameValidation = $("<span></span>");
const $emailValidation = $("<span></span>");
const $activitiesValidation = $(
  '<span class="invalidLabel">Please Select at least one activity</span>'
);
const $creditValidation = $("<span></span>");
const $zipValidation = $("<span></span>");
const $cvvValidation = $("<span></span>");

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

$("#color").prepend($selectColor);

// Hide all color options
$("#color option").each(function() {
  $(this).hide();
});

// hide/show correct color options for design selected
$("#color").hide();
$("#color")
  .siblings()
  .hide();

$("#design").change(function() {
  if ($(this).val() === "js puns") {
    $("#color").hide();
    $("#color").show();
    $("#color")
      .siblings()
      .show();
    $($selectColor)
      .hide()
      .attr("selected", false);
    $(
      '#color option[value="tomato"], [value="steelblue"], [value="dimgrey"]'
    ).hide();
    $(
      '#color option[value="cornflowerblue"],[value="darkslategrey"], [value="gold"]'
    ).show();
    $('color option[value="cornflowerblue"]').attr("selected", true);
    $("#color").val("cornflowerblue");
  } else if ($(this).val() === "heart js") {
    $("#color").hide();
    $("#color").show();
    $("#color")
      .siblings()
      .show();
    $($selectColor)
      .hide()
      .attr("selected", false);
    $(
      '#color option[value="cornflowerblue"], [value="darkslategrey"], [value="gold"]'
    ).hide();
    $(
      '#color option[value="tomato"], [value="steelblue"], [value="dimgrey"]'
    ).show();
    $('color option[value="tomato"]').attr("selected", true);
    $("#color").val("tomato");
  } else {
    $("#color").hide();
    $("#color")
      .siblings()
      .hide();
    $("#color option").each(function() {
      $(this).hide();
    });
  }
});

// add activities hide and show
$totalHeader.show();
$(".activities").append($totalHeader);

$('input[type="checkbox"]').change(function() {
  let totalCost = 0;
  const $clickedElement = $(this);
  const $clickedTime = $(this).attr("data-day-and-time");

  $("input[type=checkbox]").each(function(index, element) {
    if (
      $clickedTime === $(element).attr("data-day-and-time") &&
      $clickedElement != $(element)
    ) {
      if ($clickedElement.is(":checked")) {
        $(element).attr("disabled", true);
      } else if ($clickedElement.is(":not(:checked)")) {
        $(element).attr("disabled", false);
      }
      $clickedElement.attr("disabled", false);
    }
  });

  $("input[type=checkbox]:checked").each(function() {
    totalCost += parseInt($(this).attr("data-cost"));
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

// append validation spans to labels
$("#name")
  .prev()
  .append($nameValidation);
$("#mail")
  .prev()
  .append($emailValidation);
$($activitiesValidation).insertAfter($("legend").eq(2));
$activitiesValidation.hide();
$("#cc-num")
  .prev()
  .append($creditValidation);
$("#zip")
  .prev()
  .append($zipValidation);
$("#cvv")
  .prev()
  .append($cvvValidation);

// form Validation functions

function isValidName(name) {
  return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
    email
  );
}

function activitiesAreSelected() {
  return $("input[type=checkbox]:checked").length >= 1;
}

function isValidCardNumber(cardNumber) {
  return /\b(?:\d[ -]*?){13,16}\b$/.test(cardNumber);
}

function isValidZipCode(zipcode) {
  return /^\d{5}$|^\d{5}-\d{4}$/.test(zipcode);
}

function isValidCVV(cvv) {
  return /^[0-9]{3,4}$/.test(cvv);
}

function $colorValidateInput(
  $input,
  validatorFunc,
  invalidMessage = " Invalid",
  validMessage = ""
) {
  if (validatorFunc($input.val())) {
    $input.removeClass("invalidBorder");
    $input.addClass("isValidBorder");
    $input
      .prev()
      .children()
      .removeClass("invalidLabel");
    $input
      .prev()
      .children()
      .addClass("isValidLabel");
    $input
      .prev()
      .children()
      .text(validMessage);
  } else {
    $input.removeClass("isValidBorder");
    $input.addClass("invalidBorder");
    $input
      .prev()
      .children()
      .removeClass("isValidLabel");
    $input
      .prev()
      .children()
      .addClass("invalidLabel");
    $input
      .prev()
      .children()
      .text(invalidMessage);
  }
}

// Keyup validation functions

$("#name").keyup(function() {
  $colorValidateInput($(this), isValidName, " Please enter your name");
});

$("#mail").keyup(function() {
  $colorValidateInput(
    $(this),
    isValidEmail,
    " Please enter your email address"
  );
});

$("#cc-num").keyup(function() {
  $colorValidateInput($(this), isValidCardNumber, "Enter a valid card number");
});

$("#zip").keyup(function() {
  $colorValidateInput($(this), isValidZipCode);
});

$("#cvv").keyup(function() {
  $colorValidateInput($(this), isValidCVV);
});

const $submitMessage = $('<div id="submitMessage"><div>');
$($submitMessage).insertBefore("button[type=submit]");
$submitMessage.css("text-align", "center");
// submit form

$("form").submit(function(e) {
  function successMessage() {
    $submitMessage.css("color", "#34a853");
    $("#submitMessage").text("Registered for Full Stack Comf! See you soon!");
  }

  // color validate before submit //
  $colorValidateInput($("#name"), isValidName, " Please enter a valid name");
  $colorValidateInput(
    $("#mail"),
    isValidEmail,
    " Please enter a valid email address"
  );

  if (activitiesAreSelected() === false) {
    $activitiesValidation.show();
  } else {
    $activitiesValidation.hide();
  }

  $colorValidateInput(
    $("#cc-num"),
    isValidCardNumber,
    "Enter a valid card number",
    isValidCardNumber($(this).val())
  );
  $colorValidateInput($("#zip"), isValidZipCode);
  $colorValidateInput($("#cvv"), isValidCVV);

  // Validate all required fields //
  if (
    isValidName($("#name").val()) &&
    isValidEmail($("#mail").val()) &&
    activitiesAreSelected() &&
    $("#payment").val() !== "credit card"
  ) {
    successMessage();
  } else if (
    isValidName($("#name").val()) &&
    isValidEmail($("#mail").val()) &&
    activitiesAreSelected() &&
    $("#payment").val() === "credit card" &&
    isValidCardNumber($("#cc-num").val()) &&
    isValidZipCode($("#zip").val()) &&
    isValidCVV($("#cvv").val())
  ) {
    successMessage();
  } else {
    e.preventDefault();
    $submitMessage.css("color", "#e01a0f");
    $("#submitMessage").text("Please fill out the required fields above!");
  }
});
