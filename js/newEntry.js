$(document).ready( function(){

  $("form").submit(function(e) {
    e.preventDefault();
  });

  $("#newEntry").on("click", function() {
      // ---------------------------------------------------------------------
      var objName = $("#nameInput").val();
      var objDescription = $("#descInput").val();
      var foundBy = $("#foundByInput").val();

      if(objName != "" && objDescription != "" && foundBy != "") {
        // names in the service - php file
        $("#pwdloginError").text("");
        $("#userloginError").text("");
        $("#foundError").text("");

        var jsonToSend = {
          // uName is the email
          "uName": objName,
          "uDescription": objDescription,
          "uFoundBy": foundBy,
          "action" : "NEW-OBJECT"
        };

        $.ajax({
          url: "./php/applicationLayer.php",
          type: "POST",
          data: jsonToSend,
          ContentType: "application/json",
          dataType: "json",
          success: function(dataJson) {
            // firstname and lastname are the specified keys on the array in php
            console.log(dataJson);
            alert("Object succesfully posted");
            document.location.href = "home.html";
          },
          error: function(erroMsg) {
            alert(erroMsg.statusText);
          }
        });
      } else {
        if(objName == "") {
          $("#userloginError").text("Missing username");
        } else {
          $("#userloginError").text("");
        }
        if(objDescription == "") {
          $("#pwdloginError").text("Missing password");
        } else {
          $("#pwdloginError").text("");
        }
        if(foundBy == "") {
          $("#foundError").text("Missing ID");
        } else {
          $("#foundError").text("");
        }
      }

    });
});
