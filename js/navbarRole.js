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
      // se agregan opciones a la navigation bar dependiendo del rol
      if(dataJson.role == "user") {
        
      } else {

      }
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
