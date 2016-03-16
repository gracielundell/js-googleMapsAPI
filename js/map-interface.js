var apiKey = require("./../.env").apiKey;

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

$(document).ready(function(){
  $("form#addressForm").submit(function(event){
    var splitAddress = $("#address").val();
    var address = splitAddress.split(" ").join("+");
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
      $('#map').text("The latitude of " + splitAddress + " is " + results.results[0].geometry.location.lat);
    });
    event.preventDefault();
    console.log('hi');
  });
});


// $(document).ready(function(){
//   $("#getHike").click(function(){
//     var splitAddress = $("#address").val();
//     var address = splitAddress.split(" ").join("+");
//     $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
//       $('#map').text("The latitude of " + splitAddress + " is " + results.results[0].geometry.location.lat);
//     });
//     console.log('hi');
//   });
// });
//
// $(document).ready(function(){
//   $("#getHike").click(function(){
//     var splitAddress = $("#address").val();
//     var address = splitAddress.split(" ").join("+");
//     var lat = results.results[0].geometry.location.lat;
//     var long = results.results[0].geometry.location.lng;
//     $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
//       debugger;
//       $('#map').text("The latitude of " + splitAddress + " is " + lat);
//       $('#map').text("The longitude of " + splitAddress + " is " + long);
//     });
//   });
// });
