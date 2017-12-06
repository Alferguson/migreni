
$(document.body).ready(function() {
	 // if UPDATE button is clicked 
  var upMigraine = {};
  var updating = false;

	$(".update-migraine").on('click', function(event) {
  	event.preventDefault();
    var migraineId = $(this)[0].name;
    console.log(migraineId);
    $.get("/api/migraine/" + migraineId, function(data) {
    	console.log(data);
      if (data) {

        console.log(data);
        var defaultTreatment = {
          treatment_name: "N/A",
          dose: "N/A",
          dose_unit: ""
        };

        if (data.Treatments[0] == undefined) {
          data.Treatments[0] = { dataValues: defaultTreatment };
        }

        if (data.Treatments[1] == undefined) {
          data.Treatments[1] = { dataValues: defaultTreatment };
        }

        upMigraine = {
          id: data.id,
          date: data.date,
          intensity: data.intensity,
          trigger: data.trigger,
          ctn: data.Treatments[0].treatment_name,
          ctd: data.Treatments[0].dose,
          atn: data.Treatments[1].treatment_name,
          atd: data.Treatments[1].dose
        }
        console.log(upMigraine);
        updating = true;
        $("#date-val-update").attr("value", moment(upMigraine.date).format("YYYY-MM-DD"));
        $("#intensity-val-update option[value='"+ upMigraine.intensity + "']").prop('selected', true);
        $("#ctn-update").attr("value", upMigraine.ctn);
        $("#ctd-update").attr("value", upMigraine.ctd);
        $("#atn-update").attr("value", upMigraine.atn);
        $("#atd-update").attr("value", upMigraine.atd);
        $("#trigger-val-update").attr("value", upMigraine.trigger);
        $("#migraine-update").modal("toggle");
      }
    });
  });

  // function to update previous migraines
  $("#submit-update").on("click", function() {
    if (updating === true) {
      upMigraine.date = $("#date-val-update").val().trim();
      upMigraine.intensity = $("#intensity-val-update").val().trim();
      upMigraine.ctn = $("#ctn-update").val().trim();
      upMigraine.ctd = $("#ctd-update").val().trim();
      upMigraine.atn = $("#atn-update").val().trim();
      upMigraine.atd = $("#atd-update").val().trim();
      upMigraine.trigger = $("#trigger-val-update").val().trim();

      $.ajax({
        method: "PUT",
        url: "/api/migraines/" + upMigraine.id,
        data: upMigraine
      }).done(function() {
        // set updating to false
        updating = false;
        window.location.href="/log";
      });
    }  
  });

  // if DELETE button is clicked 
  $(".delete-migraine").on("click", function() {
    var migraineId = $(this)[0].name;
    $.ajax({
      method: "DELETE",
      url: "/api/migraines/" + migraineId,
    }).done(function() {
      console.log("It has been deleted");
      $("#delete-success").modal("toggle");
    });
  });

  $(".delete-success-close").on("click", function(event) {
    location.reload(); //moved here so modal shows success before refresh
  });
});