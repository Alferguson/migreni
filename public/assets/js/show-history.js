$(document.body).ready(function() {
	  var url = window.location.href;
  var userId = url.split("user/history/")[1];

	// show and hide functions when buttons are clicked
	$("#show-history").on("click", function() {
		$(".option-buttons").hide();
		$(".history").show();
	});
  // show all migraine and assoicated data

    $.get("/history/" + userId, function(result) {
      console.log(result);
    });


	$("#submit-update").on("click", function() {
		console.log(userId);
		if (updating === true) {
		  $.ajax({
		    method: "PUT",
		    url: "/api/migraines/" + userId,
		    data: upMigraine
		  }).done(function() {
		    // set updating to false
		    updating = false;
		    location.reload();
		  });
		}  
	});



	// if DELETE button is clicked 
	$(".delete-migraine").on("click", function() {
		var migraineId = $(this)[0].name;
		var migraineRowInfo = {};
		// DELETE function to do DESTROY in migraine_controller.js
		$.ajax({
		  method: "DELETE",
		  url: "/api/migraines/" + migraineId,
		  data: migraineRowInfo
		}).done(function() {
		  console.log("It has been deleted");
		  event.preventDefault();
		  location.reload();
		});
	});
});	