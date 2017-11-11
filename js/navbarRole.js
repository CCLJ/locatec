$(document).ready( function(){

  // load cookie info into text fields
  var jsonToSend = {
    "action" : "CHECK-ROLE"
  };
  $.ajax({
    url: "./php/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(dataJson) {
      var newHtml = "";

    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
