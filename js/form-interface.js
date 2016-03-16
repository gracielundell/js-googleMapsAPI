$(document).ready(function(){
  $("#addItem").click(function(){
    alert("hi");
    $("#placesForm").append('<form id="addressForm">' +
    '<label for="name">Place:</label>' +
    '<input id="name" type="text"></input>' +
    '<label for="address">Enter the address:</label>' +
    '<input id="address" type="text" name="name" value=""></input>' +
    '<label for="notes">Notes:</label>' +
    '<input id="notes" type="text"></input>' +
    '<button type="submit" name="button">Add to my list</button>' +
    '</form>')
  });
});
