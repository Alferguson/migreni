// to get this party started
$(document).ready(function() {
	// on submit button click, grab id from url and create barchart from get request
	$(document).on("submit", "#create-bar-chart", barChartFromId);
		
	function barChartFromId() {
		// to store user's intensity of all migraines
		var intensity;
		// refers to bar chart id in handlebars
		var barChart = $("#bar-chart-container");

	  // to get the url and extract userId from it
	  var url = window.location.search;
	  // HOW TO DO UUID?
	  var userId;
	  if (url.indexOf("id=") !== -1) {
	    userId = url.split("=")[1];
	    getIntensity(userId);
	  }
		// This function grabs intensity from the user and creates bar graphs with chart.js
		function getIntensity(user) {
		  userId = user;
		  if (userId) {
		    userId = "id=" + userId;
		  }
		  $.get("/api/migraines/:" + userId, function(data) {
		  	// HOW TO GET TIMEDATES FOR EACH INTENSITY???
		    console.log("Migraines", data);
		    // ideally, intensity is an array of numbers as chart.js uses that for data
		    intensity = data.intensity;
		    if (!intensity || !intensity.length) {
		      console.log("Something went wrong");
		    }
		    else {
		      initializeBarChart(intensity);
		    }
		  });
		};

		function initializeBarChart(intensity) {
			// clear previous graph
			barChart.empty();
			// docs references bar chart id
			var bar-chart-container = new Chart(barChart, {
			  type: "bar",
		    data: {
		    	// label all bars with date hopefully
		    	labels: [data.date],
		      datasets: [{
	          label: "Intensity over time",
	          data: intensity,
	          borderWidth: 1
		      }]
		    },    
		    options: {
		      scales: {
		        yAxes: [{
	            ticks: {
	              beginAtZero: true
	            }
		        }]
		      }
		    }
			});
		};
	}
}	