$(document).ready(function(){
  $("form.nameForm").submit(function(event){
    var userName = $("input#name").val();
    var userNotes = $("input#notes").val();
    var splitAddress = $("#address").val();
    $("ul.placesList").append("<li>Location: " + userName + "<br>" + "Address: " + "<span class='thisAddress'>" + splitAddress + "</span>" + "<button class='showMap'>Show</button>" + "<br>" + "Notes: " + userNotes + "</li>");
    event.preventDefault();
    // $("input#name").val(" ");
    // $("input#notes").val(" ");
    // $("#address").val(" ");

  $('.showMap').click(function() {
    var splitAddress = $(this).prev(".thisAddress").text();
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
    debugger;
    var city = $(this).prev('.thisAddress').text();
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + weatherAPI, function(response){
      $("#weather").empty();
      $("#weather").append("<p>Today's Weather:<br>" + response.weather[0].description + "</p>");
    });
    event.preventDefault();
  })
});
});
