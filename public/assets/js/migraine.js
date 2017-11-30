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
    });
});

