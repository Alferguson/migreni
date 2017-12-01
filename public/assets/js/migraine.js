

function toFahrenheit(kelvin) {
    return ((9 / 5) * (kelvin - 273)  + 32);
}


$(document.body).ready(function() {
  var updating = false;
  var url = window.location.href;
  // Get the user id from the url
  // In localhost:8080/user/id
  var userId = url.split("user/")[1];
  console.log(userId);
  // calendar stuff
  $(".calendar").pignoseCalendar();
  $(".date-visibility").hide();
  $(".meds-1-visibility").hide();
  $(".meds-2-visibility").hide();

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
      var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + key;
      $.ajax({
        url: queryURL,
        method: "GET" 
      }).done(function(response) {
        // console.log(response);
        $("#weather-temp").html(toFahrenheit(response.main.temp).toFixed(2) + "&deg; (F)");
        $("#weather-city").html(response.name);
        var rain = 0;
        if (response.rain) rain = response.rain;
        currentWeather = {
          temp: toFahrenheit(response.main.temp),
          temp_min: toFahrenheit(response.main.temp_min),
          temp_max: toFahrenheit(response.main.temp_max),
          humidity: response.main.humidity,
          pressure: response.main.pressure,
          sea_level: 0,
          grnd_level: 0,
          precip: rain
        };
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
      trigger: $("#trigger-val").val() == undefined ? '' : $("#trigger-val").val().trim(),
      // currentWeather,
      chronicTreatment: {
        treatment_name: $("#chronic-treatment").val() == undefined ? '' : $("#chronic-treatment").val().trim(),
        acute: false,
        dose: $("#chronic-dosage").val() == undefined ? '' : $("#chronic-dosage").val().trim(),
        dose_unit: "mg"
      },
      acuteTreatment: {
        treatment_name: $("#acute-treatment").val() == undefined ? '' : $("#acute-treatment").val().trim(),
        acute: true,
        dose: $("#acute-dosage").val() == undefined ? '' : $("#acute-dosage").val().trim(),
        dose_unit: "mg"
      }
    };

    // TODO
    // // if function for if the user didn't enter anything for chronic treatment, get last instance of chronic treatment
    // if(chronicTreatment.name === null) {
    //   $.ajax("/api/treatments/" + userId, {
    //     type: "GET"
    //   }).then(function(chronicTreatment) {
    //     // afsdaf
    //   });
    // }

    console.log(migraine);
    $.ajax("/api/migraines/" + userId, {
      type: "POST",
      data: migraine
      // WAY TO ENTER MULITIPLE OBJECTS IN ONE AJAX CALL
    }).then(function(resultMigraine) {
      console.log(resultMigraine);
      var migraineId = resultMigraine.id;
    });
  });  
  // END OF SUBMIT

  // // FUNCTION TO GET MIGRAINE DATA AND SHOW IT
  // function getMigraineData(migraineData) {
  //   console.log("migraine data", migraineData)
  //   var newTr = $("<tr>");
  //   newTr.data("author", migraineData);
  //   newTr.append("<td>" + migraineData.date + "</td>");
  //   newTr.append("<td> " + migraineData.intensity + "</td>");
  //   newTr.append("<td>" + migraineData.trigger + "</td>");
  //   newTr.append("<td><a href='/cms?author_id=" + migraineData.id + "'>Create a Post</a></td>");
  //   newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Migraine</a></td>");
  //   return newTr;
  // };









  // show all migraine and assoicated data
  $("#show").on("click", function() {
    $.get("/api/migraines/:id" + userId, function(data) {
      var migraineData = [];
      migraineData.push(getMigraineData(migraineData));
    })
  });    



  // if UPDATE button is clicked 
  $("#update").on("click", function() {
    updating = true;
    // TODO, change update button to don't update
    // function to update previous migraines
    if (updating === true) {
      function updateMigraine(migraine) {
        $.ajax({
          method: "PUT",
          url: "/api/migraines/" + userId,
          data: migraine
        }).done(function() {
          // set updating to false
          updating = false
        })
      }
    }  
  })


  // if DELETE button is clicked 
  $("#delete").on("click", function() {
    function deleteMigraine(migraine) {
      $.ajax({
        method: "DELETE",
        url: "/api/migraines/" + userId,
        data: migraine
      }).done(function() {
        console.log("It has been deleted");
      })
    }
  });


  // END OF DOC READ HERE maybe???
});