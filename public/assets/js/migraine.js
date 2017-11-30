$(document.body).ready(function() {
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

  $("#submit").on("click", function() {
    var responses = [];
    $(".response").each(function() {
        responses.push($(this).val().trim());
    });
    console.log(responses);
  

    // object to be sent via POST request to migraine_controller.js
    var newMigraine = {
      // if func for date can be null if response[0] is true OR do that in controller???
      date: responses[1],
      intensity: responses[2],
      trigger: responses[9]
    }

    // object to be sent via POST request to treatment_controller.js
    var newChronicTreatment = {
      name: responses[4]
    }

    // object to be sent via POST request to dose_controller.js
    var newChronicDose = {
      dose: responses[5]
    }

    // object to be sent via POST request to treatment_controller.js
    var newAcuteTreatment = {
      name: responses[7]
    }

    // object to be sent via POST request to dose_controller.js
    var newAcuteDose = {
      dose: responses[8]
    }
    
    // object to be sent via POST request to category_controller.js
    var newCategory = {
      // uhhh
    }

    // Submits a new migraine and associated data via POST
    // SHOULD THIS BE REPEATED WITH EACH OBJECT OR CAN WE DO THIS ONE WITH ALL OBJECTS?
    function submitData(newMigraine) {
      $.post("/api/migraines", newMigraine)
    }

    
  });



});

