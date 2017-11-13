$(document).ready( function(){

  $("#newEntry").on("click",
    function() {
      // ---------------------------------------------------------------------
      var subject = $("#subject").val();
      var emailTo = $("#emailTo").val();
      var message = $("#message").val();

      if(subject != "" && emailTo != "" && message != "") {
        // names in the service - php file
        $("#pwdloginError").text("");
        $("#userloginError").text("");
        $("#emailError").text("");

        var jsonToSend = {
          // uName is the email
          "uSubject": subject,
          "uDescription": emailTo,
          "uMessage": message,
          "action" : "SEND-MESSAGE"
        };

        $.ajax({
          url: "./php/applicationLayer.php",
          type: "POST",
          data: jsonToSend,
          ContentType: "application/json",
          dataType: "json",
          success: function(dataJson) {
            // firstname and lastname are the specified keys on the array in php
            alert("Email succesfully sent");
            document.location.href = "home.html";
          },
          error: function(erroMsg) {
            alert(erroMsg.statusText);
          }
        });
      } else {
        if(subject == "") {
          $("#userloginError").text("Missing subject");
        } else {
          $("#userloginError").text("");
        }
        if(message == "") {
          $("#pwdloginError").text("Missing message");
        } else {
          $("#pwdloginError").text("");
        }
        if(emailTo == "") {
          $("#emailError").text("Missing email");
        } else {
          $("#emailError").text("");
        }
      }

    });
});
