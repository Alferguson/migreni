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
        fontSize: 24,
        fontColor: "#383837"
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
        display: true,
        labels: {
          fontSize: 20,
          fontColor: "#383837"
        },
        scales: {
          fontSize: 20,
          fontColor: "#383837"
        }
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Date',
            fontSize: 20,
            fontColor: "#383837"
          },
          ticks: {
            fontSize: 16,
            fontColor: "#383837"
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            min: 0,
            max: 10,
            fontSize: 16,
            fontColor: "#383837"
          },
          scaleLabel: {
            display: true,
            labelString: 'Intensity',
            fontSize: 20,
            fontColor: "#383837"
          }
        }]
      }
    }
  };

  $.get("/api/intensity", function(data) {
    var size = data.length;
    if(data.length > 0) {
      $("#startDate").val(moment.parseZone(data[0].date).format("YYYY-MM-DD"));
      $("#endDate").val(moment.parseZone(data[size - 1].date).format("YYYY-MM-DD"));
      setChartData(data);
    }
  });

  function setChartData(data) {
    var size = data.length
    var dates = [];
    var intensities = [];
    var treatNum = [];
    for (var i = 0; i < size; i++) {
      dates.push(moment.parseZone(data[i].date).format("MM-DD-YYYY"));
      intensities.push(data[i].intensity);
      treatNum.push(data[i].Treatments.length)
    }
    console.log(dates);
    console.log(intensities);
    graphdata.data = {
      labels: dates,
      datasets: [{
        data: intensities,
        label: 'Intensity'
      },
      {
        data: treatNum,
        label: 'Number of Treatments',
        borderColor: 'rgba(255,0,0,0.5)',
        backgroundColor: 'rgba(255,0,0,0.4)'
      }],
    }
    var myLineChart = new Chart(ctx, graphdata);

  }

  $("#range").on("click", function(event) {
    event.preventDefault();
    var data = {
      start: moment.parseZone($("#startDate").val(), "YYYY-MM-DD").format(),
      end: moment.parseZone($("#endDate").val(), "YYYY-MM-DD").format()
    }
    console.log(data)
    $.ajax("/api/intensity", {
      type:"get",
      data: data
    }).then(function(data) {
      if(data.length > 0)
        setChartData(data);
    });
  });
});