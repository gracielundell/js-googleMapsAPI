$(document).ready(function(){
  $("form.nameForm").submit(function(event){
    alert("hi");
    debugger;
    var userName = $("input#name").val();
    var userNotes = $("input#notes").val();
    $("ul.placesList").append("<li>Location: " + userName + "<br>" + "Notes: " + userNotes + "</li>");
    event.preventDefault();
  });
});
