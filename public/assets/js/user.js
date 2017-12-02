$(document.body).ready(function() {

  $(".error").hide();
  $("#signup").on("submit",
    function validateRegistration() {
      var username = document.forms["signup"]["username"].value;
      var password = document.forms["signup"]["password"].value;
      var password2 = document.forms["signup"]["passwordMatch"].value;
      var email = document.forms["signup"]["email"].value;
      var age = document.forms["signup"]["age"].value;
      var gender = document.forms["signup"]["gender"].value;
      var location = document.forms["signup"]["location"].value;

      //Password validation
        if (password == "") {
          $("#noPassword").show();
      }
      // Password match
        if (password !== password2) {
          $("#passwordMismatch").show();
          return false;
      }

      //Age validation
        if (isNaN(age) || age < 1 || age > 100) { 
         $("#wrongAge").show();
          // return false;

      }

        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //Email validation
        if (!filter.test(email)) {
        $("#wrongEmail").show();
        //return false;
          }

        //Username can not be null
        if (username == "") {
          $("#usernameNull").show();
          //return false;
        }
        if (location == "") {
          $("#noLocation").show();
          //return false;
      }
    });
});
