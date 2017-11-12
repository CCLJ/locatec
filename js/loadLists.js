$(document).ready( function(){

  // load cookie info into text fields
  var jsonToSend = {
    "action" : "LOAD-OBJECTS"
  };
  $.ajax({
    url: "./php/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(dataJson) {
      // $(".card-deck").addClass("d-flex flex-wrap");
      var newHtml = "";
      for(var i = 0; i < dataJson.length; i++) {
        newHtml += "<div class='card'> <img class='card-img-top' src='...' alt='Card image cap'>";
        newHtml += '<div class="card-block">';
        newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
        newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
        newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
        newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p>';
        newHtml += '</div><div class="card-footer"><button class="btn btn-dos" type="button" name="button">Claim</button></div>'
        newHtml += "</div>";
      }
      $("#objectsList").append(newHtml);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  $("#clearBtn").on("click", function() {
    var jsonToSend = {
      "action" : "LOAD-OBJECTS"
    };
    $.ajax({
      url: "./php/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success: function(dataJson) {
        // $(".card-deck").addClass("d-flex flex-wrap");
        $("#objectsList").text("");
        var newHtml = "";
        for(var i = 0; i < dataJson.length; i++) {
          newHtml += "<div class='card'> <img class='card-img-top' src='...' alt='Card image cap'>";
          newHtml += '<div class="card-block">';
          newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
          newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
          newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
          newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p>';
          newHtml += '</div><div class="card-footer"><button class="btn btn-dos" type="button" name="button">Claim</button></div>'
          newHtml += "</div>";
        }
        $("#objectsList").append(newHtml);
      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });
  })


});
