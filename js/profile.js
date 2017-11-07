$(document).ready(function(){

  // $("#tabProfile").on("click", function() {
  //
  // });
  var jsonToSend = {
    // uName is the email
    "action": "LOADPROFILE"
  };

  $.ajax({
    url: "./files/applicationLayer.php",
    type: "POST",
    dataType: "json",
    ContentType: "application/json",
    data: jsonToSend,
    success: function(descriptionJSON) {
      // console.log(descriptionJSON);
      var newHtml = "";
      newHtml += "<h3>Username: " + descriptionJSON.username + "</h3>";
      newHtml += "<p class='field'>First name: <span class='info'>" + descriptionJSON.firstname + "</span></p>";
      newHtml += "<p class='field'>Last Name: <span class='info'>" + descriptionJSON.lastname + "</span></p>";
      newHtml += "<p class='field'>Email: <span class='info'>" + descriptionJSON.email + "</span></p>";
      newHtml += "<p class='field'>Gender: <span class='info'>" + descriptionJSON.gender + "</span></p>";
      newHtml += "<p class='field'>Country: <span class='info'>" + descriptionJSON.country + "</span></p>";
      $("#profileSection div").append(newHtml);
    },
    error: function(error) {
      alert("error");
    }
  });

});
