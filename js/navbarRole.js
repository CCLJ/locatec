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
      console.log(dataJson);
      var newHtml = "";
      console.log(dataJson);
      // se agregan opciones a la navigation bar dependiendo del rol
      if(dataJson.role != "user") {
        newHtml += '<li class="nav-item"> <a class="nav-link" href="home.html">Home</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="profile.html">Profile</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="claimed.html">Claimed Objects</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="Users.html">Users</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="newObject.html">New Entry</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="contact.html">Contact Us</a></li>';
      } else {
        newHtml += '<li class="nav-item"> <a class="nav-link" href="home.html">Home</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="profile.html">Profile</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="claimed.html">Claimed Objects</a></li>';
        newHtml += '<li class="nav-item"> <a class="nav-link" href="contact.html">Contact Us</a></li>';
      }
      newHtml += '<li class="nav-item"><button type="button" name="button">Logout</button></li>';
      $("#navbarSupportedContent > ul").append(newHtml);
    },
    error: function(erroMsg){
      alert(erroMsg.statusText);
    }
  });


});
