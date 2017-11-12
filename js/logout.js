$(document).ready( function(){

  $("#logout").on("click", function() {
      // ---------------------------------------------------------------------
      var jsonToSend = {
        // uName is the email
        "action" : "LOGOUT"
      };

      $.ajax({
        url: "./php/applicationLayer.php",
        type: "POST",
        data: jsonToSend,
        ContentType: "application/json",
        dataType: "json",
        success: function(dataJson) {
          // firstname and lastname are the specified keys on the array in php
          if(dataJson.destroyed == "Session destroyed") {
            alert("Signing out...");
            localStorage.removeItem("who");
            document.location.href = "index.html";
          } else {
            alert("Something went wrong, try again later.");
          }

        },
        error: function(erroMsg) {
          alert(erroMsg.statusText);
        }
      });


    });
});
