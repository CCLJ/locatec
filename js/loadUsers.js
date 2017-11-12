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
        newHtml += "<td>" + dataJson[i].institution_id + "</th>"
        newHtml += "<td>" + dataJson[i].fName + "</th>"
        newHtml += "<td>" + dataJson[i].lName + "</th>"
        newHtml += "<td>" + dataJson[i].email + "</th>"
        newHtml += "<td> <button class='btn btn-primary selectUser' type='button' name='button'>See profile</button></th>"
        newHtml += "</tr>"
      }
      newHtml += "</tbody>";
      console.log(newHtml);
      $("#objectsList").append(newHtml);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
