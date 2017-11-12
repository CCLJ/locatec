$(document).ready( function(){

  $("#searchBtn").on("click", function() {

    if($("#searchInput").val() != "") {
      var jsonToSend = {
        "action" : "SEARCH-OBJECTS",
        "key": $("#searchInput").val()
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
            newHtml += '<div class="card"> <img class="card-img-top objects" src=' + fakeImage + ' alt="Card image cap">';
            newHtml += '<div class="card-block">';
            newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
            newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
            newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
            newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p>';
            newHtml += '</div><div class="card-footer"><button class="btn btn-dos" type="button" name="button">Claim</button></div>'
            newHtml += "</div>";
          }
          $("#objectsList").html(newHtml);
        },
        error: function(erroMsg) {
          alert(erroMsg.statusText);
        }
      });
    } else {
      alert("Enter a keyword for the search");
    }
  });

});
