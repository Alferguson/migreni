

function toFahrenheit(kelvin) {
    return ((9 / 5) * (kelvin - 273)  + 32);
}

function clearSurveyForm() {
  $("#q1").val("");
  $("#q4").val("");
  $("#q7").val("");
  $("#date-val").val("");
  $("#intensity-val").val("");
  $("#chronic-treatment").val("");
  $("#chronic-dosage").val("");
  $("#acute-treatment").val("");
  $("#acute-dosage").val("");
  $("#trigger-val").val("");
  $(".date-visibility").hide();
  $(".meds-1-visibility").hide();
  $(".meds-2-visibility").hide();
}


$(document.body).ready(function() {
  var ctn = 0;
  var ctd = 0;
  var updating = false;
  var url = window.location.href;
  // Get the user id from the url
  // In localhost:8080/user/id
  var userId = url.split("user/")[1];
  // calendar stuff
  $(".calendar").pignoseCalendar();
  $(".survey").attr('hidden', false);
  $(".survey").hide();
  $(".option-buttons").show();

  $("#show-survey").on("click", function() {
    $(".option-buttons").hide();
    $(".survey").show();
    $(".date-visibility").hide();
    $(".meds-1-visibility").hide();
    $(".meds-2-visibility").hide();
  });

  $(".cancel").on("click", function(event) {
    clearSurveyForm();
    $(".survey").hide();
    $(".option-buttons").show();
  });

  $("#q1").change(function(event) {
    var answer = $("#q1 option:selected").text();
    if (answer === "No") $(".date-visibility").show();
    else $(".date-visibility").hide();
  });

  $("#q4").change(function(event) {
    var answer = $("#q4 option:selected").text();
    if (answer === "Yes") $(".meds-1-visibility").show();
    else $(".meds-1-visibility").hide();
  });

  $("#q7").change(function(event) {
    var answer = $("#q7 option:selected").text();
    if (answer === "Yes") $(".meds-2-visibility").show();
    else $(".meds-2-visibility").hide();
  });

  // weather call
  var currentWeather = {};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var key = "75c2d4ad99db9a0ce09e0a27d9dca4fd";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + key;
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET" 
      }).done(function(response) {
        console.log(response);
        $("#weather-temp").html(toFahrenheit(response.main.temp).toFixed(2) + "&deg; (F)");
        $("#weather-city").html(response.name);
        var rain = 0;
        if (response.rain) rain = response.rain;
        // conditional if rain is blank
        currentWeather = response.main;
        if (response.rain) {
          currentWeather.precip = response.rain["3h"];
        } else {

          currentWeather.precip = 0;
        }
      });
    });
  }



  // on submit btn click
  $("#submit-survey").on("click", function(event) {
    event.preventDefault();
    var dateVal = $("#date-val").val() == undefined ? '' : $("#date-val").val().trim();
    if (dateVal === "") dateVal = moment().format('YYYY-MM-DD');

    // object for migraine data
    var migraine = {
      intensity: $("#intensity-val").val() == undefined ? '' : $("#intensity-val").val().trim(),
      location: $("#weather-city").text(),
      date: dateVal,
      trigger: $("#trigger-val").val() == "" ? '' : $("#trigger-val").val().trim(),
      currentWeather,
      chronicTreatment: {
        treatment_name: $("#chronic-treatment").val() == "" ? ctn : $("#chronic-treatment").val().trim(),
        acute: false,
        dose: $("#chronic-dosage").val() == "" ? ctd : $("#chronic-dosage").val().trim(),
        dose_unit: "mg"
      },
      acuteTreatment: {
        treatment_name: $("#acute-treatment").val() == "" ? 'N/A' : $("#acute-treatment").val().trim(),
        acute: true,
        dose: $("#acute-dosage").val() == "" ? 0 : $("#acute-dosage").val().trim(),
        dose_unit: "mg"
      }
    };

    // POST new migraine and assoicated data
    $.ajax("/api/migraines/", {
      method: "POST",
      data: migraine
    }).then(function(resultMigraine) {
      clearSurveyForm();
      $(".history").hide();
      $(".survey").hide();
      $(".option-buttons").show();
      console.log("Migraine data has been logged");
      $("#migraine-success").modal("toggle");
    });
  // END OF SUBMIT
  });

  $(".migraine-success-close").on("click", function(event) {
    location.reload(); //moved here so modal shows success before refresh
  });
  // END OF DOC READ HERE
});