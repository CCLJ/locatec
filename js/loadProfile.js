$(document).ready( function(){

  var jsonToSend = {
    "action" : "LOAD-PROFILE"
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
