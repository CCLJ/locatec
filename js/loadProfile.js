$(document).ready( function(){

  var email = localStorage.getItem("who");
  console.log(email);
  var jsonToSend = {
    "action" : "LOAD-PROFILE",
    "mail": email
  };
  $.ajax({
    url: "./php/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(dataJson) {
      var newHtml = "";
      console.log(dataJson);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
