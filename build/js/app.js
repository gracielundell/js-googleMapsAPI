(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyAQTD4JxQYC1vLN-La-4gfyfURn5JC6348";

exports.weatherAPI = "19e5e8222f081c8bd019804334478683";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/browser-interface.js":2}]},{},[3]);
