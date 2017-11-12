$(document).ready( function(){

  var jsonToSend = {
    "action" : "LOAD-USERS"
  };
  $.ajax({
    url: "./php/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(dataJson) {
      var newHtml = "";
      newHtml += '<thead> <tr> <th>ID</th> <th>First Name</th> <th>Last Name</th> <th>Email</th> <th>Select user</th> </tr> </thead>';
      newHtml += "<tbody>";
      for (var i = 0; i < dataJson.length; i++) {
        newHtml += "<tr>";
        newHtml += "<td name='id'>" + dataJson[i].institution_id + "</td>"
        newHtml += "<td name='fname'>" + dataJson[i].fName + "</td>"
        newHtml += "<td name='lname'>" + dataJson[i].lName + "</td>"
        newHtml += "<td name='email'>" + dataJson[i].email + "</td>"
        newHtml += "<td > <input class='btn btn-primary selectUser' type='submit' value='See profile'></td>"
        newHtml += "</tr>"
      }
      newHtml += "</tbody>";
      $("#objectsList").append(newHtml);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  $("#objectsList").on("click", ".selectUser", function() {
    var currentRow = $(this).closest("tr");
    var email = currentRow.find("td:eq(3)").text();
    // cuando estes en loadProfile.js, manda este item como parte de jsonToSend
    // y en el php, revisas si el usuario loggeado es un admin o user
    // Si es un admin, usa el valor de este item para la query de cargar el perfil
    // Si es un user, usa el mail guardado en SESSION para la query.
    localStorage.setItem("who", email);
    var email = localStorage.getItem("who");
    console.log(email);
    var jsonToSend = {
      "action" : "LOAD-PROFILE",
      "mail": email
    };
    $.ajax({
      url: "./php/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success: function(dataJson) {
        console.log(dataJson);
        document.location.href = "profile.html";
      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });

  });

});
