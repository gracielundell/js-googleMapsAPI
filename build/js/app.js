(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyBissOznhs8zc9xBCKX5yqDpo9xBB2yYEg";

},{}],2:[function(require,module,exports){

// $(document).ready(function(){
//   $("#addItem").click(function(){
//     $("#placesForm").append('<form id="addressForm">' +
//                               '<div class="fields">' +
//                                 '<label for="name">Place</label>' +
//                                 '<input id="name" type="text"></input>' +
//                               '</div>' +
//                               '<div class="fields">' +
//                                 '<label for="address">Enter the address</label>' +
//                                 '<input id="address" type="text" name="name" value=""></input>' +
//                               '</div>' +
//                               '<div class="fields">' +
//                                 '<label for="notes">Notes</label>' +
//                                 '<input id="notes" type="text"></input>' +
//                               '</div>' +
//                               '<button class="submitBtn" type="submit" name="button">Add to my list</button>' +
//                             '</form>')
//   });
// });

var apiKey = require("./../.env").apiKey;

$(document).ready(function(){
  $(".listForm").hide();
  $("form#addressForm").submit(function(event){
    var splitAddress = $("#address").val();
    var address = splitAddress.split(" ").join("+");
    var lat;
    var long;
    debugger;
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + "&key=" + apiKey).then(function(results){
      lat = results.results[0].geometry.location.lat;
      long = results.results[0].geometry.location.lng;
      $('.geometry').text("The latitude of " + splitAddress + " is " + lat + ". The longitude of " + splitAddress + " is " + long);
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
    event.preventDefault();
    $(".listForm").show();
  });
});

},{"./../.env":1}]},{},[2]);
