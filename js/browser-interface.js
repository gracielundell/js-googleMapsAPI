var weatherAPI = require("./../.env").weatherAPI;

exports.Forecast = function() {
  var city = $('#address').val();
  $.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + weatherAPI, function(response){
    $("#weather5Day").empty();
    $('#day1').prepend("5 Day Forecast:<br>");
    for (var i = 0; i <= 5; i++) {
      $('#day' + [i]).append(response.list[i].weather[0].description);
    };
  });
};
