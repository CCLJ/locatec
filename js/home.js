$(document).ready(function(){

  $.ajax({
    url: "./files/checkSessionService.php",
    type: "POST",
    dataType: "json",
    success: function(sessionJSON) {
      if(sessionJSON.isactive == "false") {
        alert("Session expired");
        document.location.href = "index.html";
      }
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  $("#menu > li").on("click", function() {
		// alert("clicked");
		$(".selected").removeClass("selected");
		var currentClass = $(this).attr("class");
		$(this).addClass("selected");

    $(".resultsTable").css("display", "none");

		$(".selectedSection").removeClass("selectedSection").addClass("notSelected");
		$("#" + currentClass).addClass("selectedSection").removeClass("notSelected");

    // check session each time it is clicked on a tab
    $.ajax({
      url: "./files/checkSessionService.php",
      type: "POST",
      dataType: "json",
      success: function(sessionJSON) {
        if(sessionJSON.isactive == "false") {
          alert("Session expired");
          document.location.href = "index.html";
        }
      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });
	});

  // load comments
  var jsonToSend = {
    "action": "LOADCOMMENTS"
  };
  $.ajax({
    url: "./files/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(commentsJSON) {
      var newHtml = "";
      for(var i = 0; i < commentsJSON.length; i++){
        newHtml = "<tr>";
        newHtml += "<td>" + commentsJSON[i].comment + "</td>";
        newHtml += "<td>" + commentsJSON[i].user + "</td>";
        newHtml += "</tr>";
        $("#comments").append(newHtml);
      }
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  // load friends
  jsonToSend = {
    "action": "LOADFRIENDS"
  };
  $.ajax({
    url: "./files/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(friendsJSON) {
      var newHtml = "";
      for(var i = 0; i < friendsJSON.length; i++){
        newHtml = "<tr>";
        newHtml += "<td>" + friendsJSON[i].email + "</td>";
        newHtml += "<td>" + friendsJSON[i].username + "</td>";
        newHtml += "<td>" + friendsJSON[i].firstname + "</td>";
        newHtml += "<td>" + friendsJSON[i].lastname + "</td>";
        newHtml += "<td>" + friendsJSON[i].country + "</td>";
        newHtml += "<td>" + friendsJSON[i].gender + "</td>";
        newHtml += "</tr>";
        $("#friendsTable").append(newHtml);
      }
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  // load friend requests
  jsonToSend = {
    "action": "LOADREQUESTS"
  };
  $.ajax({
    url: "./files/applicationLayer.php",
    type: "POST",
    data: jsonToSend,
    ContentType: "application/json",
    dataType: "json",
    success: function(friendsJSON) {
      var newHtml = "";
      newHtml += "<tr> <th>Email</th> <th>Username</th> <th>Firstname</th> <th>Lastname</th> <th>Country</th> <th>Gender</th> <th>Accept</th> <th>Reject</th></tr>";
      for(var i = 0; i < friendsJSON.length; i++){
        newHtml += "<tr>";
        newHtml += "<td>" + friendsJSON[i].email + "</td>";
        newHtml += "<td>" + friendsJSON[i].username + "</td>";
        newHtml += "<td>" + friendsJSON[i].firstname + "</td>";
        newHtml += "<td>" + friendsJSON[i].lastname + "</td>";
        newHtml += "<td>" + friendsJSON[i].country + "</td>";
        newHtml += "<td>" + friendsJSON[i].gender + "</td>";
        newHtml += "<td> <input class='acceptButton' type='submit' value='Accept'> </td>";
        newHtml += "<td> <input class='rejectButton' type='submit' value='Reject'> </td>";
        newHtml += "</tr>";
        $("#requestsTable").html(newHtml);
      }
    },
    error: function(erroMsg) {
      alert(erroMsg.statusText);
    }
  });

  // added functionality for text area - adding data to table and DB
  $("#commentButton").on("click", function() {
    if($("textarea").val() != "") {
      jsonToSend = {
        "comment": $("textarea").val(),
        "action": "ADDCOMMENT"
      };
      $.ajax({
        url: "./files/applicationLayer.php",
        type: "POST",
        data: jsonToSend,
        ContentType: "application/json",
        dataType: "json",
        success: function(commentsJSON) {
          var newHtml = "";
          newHtml += "<tr>";
          newHtml += "<td>" + commentsJSON.comment + "</td>";
          newHtml += "<td>" + commentsJSON.user + "</td>";
          newHtml += "</tr>";
          $("#comments").append(newHtml);
          $("textarea").val("");
          $("#commentError").html(commentsJSON.result);
        },
        error: function(erroMsg) {
          alert(erroMsg.statusText);
        }
      });
    } else {
      $("#commentError").html("Please write a comment in the area");
    }
  });


  // search friends
  $("#searchButton").on("click", function() {

    if($("#search").val() != "") {
      $("#searchError").val("");

      jsonToSend = {
        "uSearch": $("#search").val(),
        "action": "FINDFRIENDS"
      };
      $.ajax({
        url: "./files/applicationLayer.php",
        type: "POST",
        data: jsonToSend,
        ContentType: "application/json",
        dataType: "json",
        success: function(friendsJSON) {
          $(".resultsTable").css("display", "block");
          var newHtml = "";
          newHtml += "<tr> <th>Email</th> <th>Username</th> <th>Firstname</th> <th>Lastname</th> <th>Country</th> <th>Gender</th> <th>Send Friend Request</th></tr>";
          for(var i = 0; i < friendsJSON.length; i++){
            newHtml += "<tr>";
            newHtml += "<td>" + friendsJSON[i].email + "</td>";
            newHtml += "<td>" + friendsJSON[i].username + "</td>";
            newHtml += "<td>" + friendsJSON[i].firstname + "</td>";
            newHtml += "<td>" + friendsJSON[i].lastname + "</td>";
            newHtml += "<td>" + friendsJSON[i].country + "</td>";
            newHtml += "<td>" + friendsJSON[i].gender + "</td>";
            newHtml += "<td> <input class='addButton' type='submit' value='Add friend'> </td>";
            newHtml += "</tr>";
            $("#resultsTable").html(newHtml);
          }
        },
        error: function(erroMsg) {
          alert(erroMsg.statusText);
        }
      });


    } else {
      $("#searchError").val("Don't leave serach textfield empty");
    }

  });

  // send friend request
  $("#resultsTable").on("click", ".addButton", function() {

    var currentRow = $(this).closest("tr");
    var email = currentRow.find("td:eq(0)").text();

    jsonToSend = {
      "action": "ADDFRIEND",
      "friend": email
    };

    $.ajax({
      url: "./files/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success: function(friendsJSON) {

        alert("Friend Request Sent");
        currentRow.find(".addButton").prop('disabled', true);
        currentRow.hide();

      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });

  });

  // accept friend request
  $("#requestsTable").on("click", ".acceptButton", function() {

    var currentRow = $(this).closest("tr");
    var email = currentRow.find("td:eq(0)").text();
    jsonToSend = {
      "action": "ACCEPTREQUEST",
      "from": email
    };

    $.ajax({
      url: "./files/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success: function(friendsJSON) {

        alert("Friend Added");
        currentRow.find(".acceptButton").prop('disabled', true);
        currentRow.find(".rejectButton").prop('disabled', true);
        currentRow.hide()

      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });
  });

  // reject friend request
  $("#requestsTable").on("click", ".rejectButton", function() {

    var currentRow = $(this).closest("tr");
    var email = currentRow.find("td:eq(0)").text();
    jsonToSend = {
      "action": "REJECTREQUEST",
      "from": email
    };

    $.ajax({
      url: "./files/applicationLayer.php",
      type: "POST",
      data: jsonToSend,
      ContentType: "application/json",
      dataType: "json",
      success: function(friendsJSON) {

        alert("Request Deleted");
        currentRow.find(".acceptButton").prop('disabled', true);
        currentRow.find(".rejectButton").prop('disabled', true);
        currentRow.hide()

      },
      error: function(erroMsg) {
        alert(erroMsg.statusText);
      }
    });
  });


});
