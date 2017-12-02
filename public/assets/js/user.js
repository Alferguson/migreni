$(document.body).ready(function() {

  $(".error").hide();
  $("#signup").on("submit",
    function validateRegistration() {
      var username = document.forms["signup"]["username"].value;
      var password = document.forms["signup"]["password"].value;
      var password2 = document.forms["signup"]["passwordMatch"].value;
      var email = document.forms["signup"]["email"].value;
      var age = document.forms["signup"]["email"].value;
      var gender = document.forms["signup"]["gender"].value;
      var location = document.forms["signup"]["location"].value;

      if (password !== password2) {
        $("#passwordMismatch").show();
        return false;
      }
    });
})