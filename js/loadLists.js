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

      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
          <h4 class="card-title">Card title</h4>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>

      var newHtml = "";
      for(var i = 0; i < dataJson.length; i++) {
        newHtml += "<div class='card'> <img class='card-img-top' src='...' alt='Card image cap'>";
        newHtml += '<div class="card-body">';
        newHtml += '<h4 class="card-title">' + dataJson[i].name + '</h4>';
        newHtml += '<p class="card-text">' + dataJson[i].description + '</p>';
        newHtml += "<p class='card-text'>Found by: " + dataJson[i].foundBy + "</p>";
        newHtml += '<p class="card-text"><small class="text-muted">Date found: ' + dataJson[i].dateFound + '</small></p>';
        newHtml += "</div></div>"
      }

    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
