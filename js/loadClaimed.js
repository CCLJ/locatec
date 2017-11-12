$(document).ready( function(){

  // load cookie info into text fields
  var jsonToSend = {
    "action" : "LOAD-CLAIMED"
  };
  $.ajax({
    url: "./php/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(dataJson) {
      var newHtml = "";
      for(var i = 0; i < dataJson.length; i++) {
        // console.log(dataJson[i].imageURL);
        var imageSrc = 'http://localhost/Locatec/objects/' + dataJson[i].imageURL;
        var fakeImage = 'img/' + dataJson[i].imageURL
        newHtml += '<div class="card"> <img class="card-img-top objects" src=' + fakeImage + ' alt="Card image cap">';
        newHtml += '<div class="card-block">';
        newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
        newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
        newHtml += "<p class='card-text'>Found by: " + dataJson[i].found_by + "</p>";
        newHtml += "<p class='card-text'>Claimed by: " + dataJson[i].claimed_by + "</p>"
        newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].date_found + '</small></p></div>';
        if (dataJson[i].role == "admin"){
          newHtml += '<div class="card-footer"><button class="btn btn-dos ' + dataJson[i].claimed_by + '" type="button" name="userInfo">See ' + dataJson[i].claimed_by + ' profile</button></div>';
        }
        newHtml += "</div>";
      }
      $("#objectsList").append(newHtml);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  $(".card-deck").on("click", ".btn-dos", function() {
    var user = $(this).attr("class");
    user = user.slice(12, 21);
    user += "@itesm.mx";
    console.log(user);
    localStorage.setItem("who", user);
    document.location.href = "profile.html";
  });


});
