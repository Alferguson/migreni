

function toFahrenheit(kelvin) {
    return ((9 / 5) * (kelvin - 273)  + 32);
}


$(document.body).ready(function() {
    var url = window.location.href;
    // Get the user id from the url
    // In localhost:8080/user/id
    var userId = url.split("user/")[1];

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

    $("#submit").on("click", function() {

        var dateVal = $("#date-val").val().trim();
        if (dateVal === "") dateVal = moment().format('YYYY-MM-DD');
        var migraines = {
            intensity: $("#intensity-val").val().trim(),
            location: $("#weather-city").text(),
            date: dateVal,
            trigger: $("#trigger-val").val().trim()
        };
        console.log(migraines);
        $.ajax("/api/migraines/" + userId, {
            type: "POST",
            data: migraines
        }).then(function(resultMigraine) {
            console.log(resultMigraine);
            var migraineId = resultMigraine.id
            $.ajax("/api/weather/" + migraineId, {
                type: "POST",
                data: currentWeather
            }).done(function(resultWeather) {
                console.log(resultWeather);
            });
        });



// put inside first ajax call
        var chronicTreatment = {
            name: $("#chronic-treatment").val().trim(),
            acute: false,
            dose: {
                value: $("#chronic-dosage").val().trim()
            }
        }
        // TODO
        // if function for if the user didn't enter anything for chronic treatment, get last instance of chronic treatment
        if(chronicTreatment.name === null) {
            $.ajax("/api/treatments/" + userId, {
                type: "GET"
            }).then(function(chronicTreatment) {
                // afsdaf
            })
        }

        var acuteTreatment = {
            name: $("#acute-treatment").val().trim(),
            acute: true,
            dose: {
                value: $("#acute-dosage").val().trim()
            }
        }

        // POST a new chronic treatment and acute treatment
        $.ajax("/api/treatments/" + userId, {
            type: "POST",
            data: chronicTreatment
        }).then(function(resultChronicTreatment) {
            console.log(resultChronicTreatment);
            $.ajax("/api/dose/" + userId, {
                type: "POST",
                data: chronicTreatment.dose
            }).then(function(doseResult) {
                console.log(doseResult);
                // acute treatment call
                $.ajax("/api/treatments/" + userId, {
                    type: "POST",
                    data: acuteTreatment
                }).then(function(resultAcuteTreatment) {
                    console.log(resultAcuteTreatment);
                    // acute treatment call
                    $.ajax("/api/dose/" + userId, {
                        type: "POST",
                        data: acuteTreatment.dose
                    }).then(function(doseResult) {
                        console.log(doseResult);
                    })
                })
            })
        });
    });
    // END OF SUBMIT

  // FUNCTION TO GET MIGRAINE DATA AND SHOW IT
  function createMigraineData(migraineData) {
    console.log("author data", migraineData)
    var newTr = $("<tr>");
    newTr.data("author", migraineData);
    newTr.append("<td>" + migraineData.date + "</td>");
    newTr.append("<td> " + migraineData.intensity + "</td>");
    newTr.append("<td>" + migraineData.trigger + "</td>");
    newTr.append("<td><a href='/cms?author_id=" + migraineData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Migraine</a></td>");
    return newTr;
  }  

    // show all migraine and assoicated data
    $("#show").on("click", function() {
        $.get("/api/migraines/:id" + userId, function(data) {
            var migraineData = [];
            migraineData.push(createMigraineData(migraineData));
        })
    }    

});