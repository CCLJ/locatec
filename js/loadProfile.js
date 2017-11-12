$(document).ready( function(){

  // load cookie info into text fields
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
      // $(".card-deck").addClass("d-flex flex-wrap");
      var newHtml = "";
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
