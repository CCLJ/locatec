$(document).ready( function(){

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
      var newHtml = "";
      console.log(dataJson);
      newHtml += '<thead> <tr> <th>Name</th> <th>Date Found</th> <th>Date Claimed</th> <th>Found By</th></tr> </thead>';
      newHtml += "<tbody>";
      for (var i = 0; i < dataJson.length; i++) {
        newHtml += "<tr>";
        newHtml += "<td name='id'>" + dataJson[i].name + "</td>"
        newHtml += "<td name='fname'>" + dataJson[i].date_found + "</td>"
        newHtml += "<td name='lname'>" + dataJson[i].date_claimed + "</td>"
        newHtml += "<td name='email'>" + dataJson[i].found_by + "</td>"
        newHtml += "</tr>"
      }
      newHtml += "</tbody>";
      $("#claimedObjects").append(newHtml);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  jsonToSend = {
    "action": "LOAD-USER",
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
      $("#userName").text(dataJson.fname + " " + dataJson.lname);
      $("#userId").text(dataJson.institution_id);
      $("#userMail").text(dataJson.email);
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });


});
