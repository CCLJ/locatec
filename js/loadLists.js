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
      // console.log(dataJson);
      var newHtml = "";
      for(var i = 0; i < dataJson.length; i++) {
        var imageSrc = 'http://localhost/Locatec/objects/' + dataJson[i].imageURL;
        //var fakeImage = 'img/fake.png';
        var fakeImage = 'img/' + dataJson[i].imageURL
        console.log(fakeImage);
        newHtml += '<div class="card"> <img class="card-img-top rounded mx-auto d-block objects" src=' + fakeImage + ' alt="Card image cap">';
        newHtml += '<div class="card-block">';
        newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
        newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
        newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
        newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p></div>';
        if (dataJson[i].role == "user"){
          newHtml += '<div class="card-footer"><button id=' + dataJson[i].id + ' class="btn btn-dos" type="button" name="button">Claim</button></div>'
        }
        newHtml += "</div>";
        // newHtml += "</div>";
      }
      $("#objectsList").html(newHtml);
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
          var fakeImage = 'img/' + dataJson[i].imageURL
          newHtml += '<div class="card"> <img class="card-img-top rounded mx-auto d-block objects" src=' + fakeImage + ' alt="Card image cap">';
          newHtml += '<div class="card-block">';
          newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
          newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
          newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
          newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p></div>';
          if (dataJson[i].role == "user"){
            newHtml += '<div class="card-footer"><button id=' + dataJson[i].id + ' class="btn btn-dos" type="button" name="button">Claim</button></div>'
          }
          newHtml += "</div>";
        }
        $("#objectsList").html(newHtml);
      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });
  })

  $("#objectsList").on("click", ".btn", function(){
    var uniqueId = $(this).attr("id");
    var jsonToSend = {
      "id" : uniqueId,
      "action" : "REFRESH-OBJECT"
    };
    console.log(uniqueId);
    $.ajax({
      url : "./php/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success : function(dataJson){
        console.log(dataJson);
      },
      error : function(errorMsg){
        alert(errorMsg.statusText);
      }
    });

    jsonToSend = {
      "action" : "LOAD-OBJECTS"
    };
    $.ajax({
      url: "./php/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success: function(dataJson) {
        var newHtml = "";
        if (dataJson[0].name != "a1s2d3"){
          for(var i = 0; i < dataJson.length; i++) {
            // newHtml += "<div class='col-md-3>'"
            var fakeImage = 'img/' + dataJson[i].imageURL
            newHtml += '<div class="card"> <img class="card-img-top rounded mx-auto d-block objects" src=' + fakeImage + ' alt="Card image cap">';
            newHtml += '<div class="card-block">';
            newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
            newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
            newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
            newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p></div>';
            if (dataJson[i].role == "user"){
              newHtml += '<div class="card-footer"><button id=' + dataJson[i].id + ' class="btn btn-dos" type="button" name="button">Claim</button></div>'
            }
            newHtml += "</div>";
            // newHtml += "</div>";
          }
        }
        $("#objectsList").html(newHtml);
      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });

  })

});
