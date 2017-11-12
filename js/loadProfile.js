$(document).ready( function(){

  var email = localStorage.getItem("who");
  var jsonToSend = {
    "action" : "LOAD-PROFILE",
    "user": email
  };
  $.ajax({
    url: "./php/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(dataJson) {
      console.log(dataJson);
      var newHtml = "";

    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
