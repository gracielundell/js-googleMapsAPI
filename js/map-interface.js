var apiKey = require("./../.env").apiKey;
var Forecast = require("./../js/browser-interface.js").Forecast;

$(document).ready(function(){
  $(".listForm").hide();
  $("#weather").hide();
  $("form#addressForm").submit(function(event){
    var splitAddress = $("#address").val();
    var address = splitAddress.split(" ").join("+");
    var lat;
    var long;
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
      lat = results.results[0].geometry.location.lat;
      long = results.results[0].geometry.location.lng;
      var userLatLng = new google.maps.LatLng(lat, long);
      var myOptions = {
        zoom : 16,
        center : userLatLng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
      };
      var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
      new google.maps.Marker({
        map: mapObject,
        position: userLatLng
      });
    });
    var city = $('#address').val();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherAPI, function(response){
      $(".todaysWeather").empty();
      $(".todaysWeather").prepend("<p>Today's Weather:<br>" + response.weather[0].description + "</p>");
      // Pulls in function for 5 day forecast
      var newForecast = new Forecast();
    });
    event.preventDefault();
    $(".listForm").show();
    $("#weather").show();
  });
});
