$(document).ready( function(){

  // load cookie info into text fields
  // $.ajax({
  //   url: "./files/loadUserService.php",
  //   type: "POST",
  //   dataType: "json",
  //   success: function(dataJson) {
  //     // firstname and lastname are the specified keys on the array in php
  //     $("#user").val(dataJson.user);
  //     $("#password").val(dataJson.password);
  //   },
  //   error: function(erroMsg) {
  //     alert(erroMsg.statusText);
  //   }
  // });

  $("#loginForm").on("click",
    function() {
      // ---------------------------------------------------------------------
      var username = $("#idInput").val();
      var password = $("#pwdInput").val();

      if(username != "" && password != "") {
        // names in the service - php file
        $("#pwdloginError").text("");
        $("#userloginError").text("");

        var remember = "false";
        if($("input[type='checkbox']").is(':checked')) {
          remember = "true";
        } else {
          remember = "false";
        }

        var jsonToSend = {
          // uName is the email
          "uName": username,
          "uPassword": password,
          "uRemember": remember,
          "action" : "LOGIN"
        };

        $.ajax({
          url: "./php/applicationLayer.php",
          type: "POST",
          data: jsonToSend,
          ContentType: "application/json",
          dataType: "json",
          success: function(dataJson) {
            // firstname and lastname are the specified keys on the array in php
            alert("Welcome back: " + dataJson.firstname + " " + dataJson.lastname);
            document.location.href = "home.html";
          },
          error: function(erroMsg) {
            alert(erroMsg.statusText);
          }
        });
      } else {
        if(username == "") {
          $("#userloginError").text("Missing username");
        } else {
          $("#userloginError").text("");
        }
        if(password == "") {
          $("#pwdloginError").text("Missing password");
        } else {
          $("#pwdloginError").text("");
        }
      }

    });
});
