
function getLocation() {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(getWeather, error);
    else console.log("Geolocation is not supported by this browser.");
}

function error(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
}

function getWeather(position) {
    var key = "75c2d4ad99db9a0ce09e0a27d9dca4fd";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + key;
    $.ajax({
        url: queryURL,
        method: "GET" 
    }).done(function(response) {
        console.log(response);
        var tempF = (9 / 5) * (response.main.temp - 273)  + 32;
        $("#weather-temp").html(tempF.toFixed(2) + "&deg; (F)");
        $("#weather-city").html(response.name);
        var currentWeather = {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
            humidity: 0,
            pressure: 0,
            sea_level: 0,
            grnd_level: 0,
            precip: 0
        };
        // $.ajax("/api/weather", {
        //     type: "POST",
        //     data: currentWeather
        // }).done(function(result) {
        //     console.log("sent " + currentWeather);
        // });
    });
}


$(document.body).ready(function() {

    getLocation();

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
        var dateVal = $("#date-val").val().trim();
        if (dateVal === "") dateVal = moment().format('YYYY-MM-DD');
        var responses = {
            intensity: $("#intensity-val").val().trim(),
            location: $("#weather-city").text(),
            date: dateVal,
            trigger: $("#trigger-val").val().trim()
        };
        console.log(responses);
        $.ajax("/api/migraines", {
            type: "POST",
            data: responses
        }).then(function(result) {
            console.log("sent " + responses);
        });
    });
});

