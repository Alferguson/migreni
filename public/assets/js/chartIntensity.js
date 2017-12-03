$(document.body).ready(function() {
  var ctx = document.getElementById("chartTime").getContext("2d");
  var username = $("#username").data('username');
  var graphdata = {
    type: 'line',
    options: {
    	chart: {
    		fontColor: "black",
    	},
      responsive: true,
      title: {
        display: true,
        text: username + ' Intensity Over Time',
        fontSize: 24
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      legend: {
      	display: false,
        labels: {
          fontSize: 20
        },
        scales: {
        	fontSize: 20
        }
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date',
        		fontSize: 20,
          },
          ticks: {
        		fontSize: 16
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 10,
        		fontSize: 16
          },
          scaleLabel: {
            display: true,
            labelString: 'Intensity',
        		fontSize: 20,
          }
        }]
      }
    }
  };

  $.get("/api/intensity", function(data) {
    var dates = [];
    var intensities = [];
    for (var i = 0; i < data.length; i++) {
      dates.push(moment(data[i].date).format("M-D-YYYY"));
      intensities.push(data[i].intensity);
    }
    console.log(dates);
    console.log(intensities);
    graphdata.data = {
      labels: dates,
      datasets: [{
        data: intensities,
        label: 'Intensity'
      }],
    }
    var myLineChart = new Chart(ctx, graphdata);
  });
});