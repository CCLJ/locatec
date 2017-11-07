$(document).ready( function(){

  $("#registerForm").on("click",
    function() {
      // ---------------------------------------------------------------------
      var username = $("#username").val();
      var password = $("#pwd").val();
      var confirm = $("#confirm").val();
      var fName = $("#firstName").val();
      var lName = $("#lastName").val();
      var email = $("#email").val();
      var country = $("#countries").val();
      var gender = $("input[type='radio'][name='radioB']");

      if(username != "" && password != "" && fName != "" && lName != ""
         && confirm != "" && email != "" && country != "" && gender.is(':checked')) {

        $("#first").text("");
        $("#last").text("");
        $("#userError").text("");
        $("#emailError").text("");
        $("#countryError").text("");
        $("#genderError").text("");
        $("#confirmError").text("");
        $("#pwdError").text("");

        var jsonToSend = {
          "uName": username,
          "uPassword": password,
          "uFirstName": fName,
          "uLastName": lName,
          "uEmail": email,
          "uCountry": country,
          "uGender": $("input[type='radio'][name='radioB']:checked").val(),
          "action": "REGISTRATION"
        };
        $.ajax({
          url: "./files/applicationLayer.php",
          type: "POST",
          data: jsonToSend,
          ContentType: "application/json",
          dataType: "json",
          success: function(dataJson) {
            // console.log(dataJson);
            alert("Register complete: " + dataJson.username + " " + dataJson.firstname + " " + dataJson.lastname);
            document.location.href = "home.html";
          },
          error: function(erroMsg) {
            alert(erroMsg.statusText);
          }
        });
      } else { // A field is missing
        if (fName === "") {
          $("#first").text("First Name missing");
        } else {
          $("#first").text("");
        }
        if (lName === "") {
          $("#last").text("Last Name missing");
        } else {
          $("#last").text("");
        }
        if (username === "") {
          $("#userError").text("Userame missing");
        } else {
          $("#userError").text("");
        }
        if (email === "") {
          $("#emailError").text("Email missing");
        } else {
          $("#emailError").text("");
        }
        if (password === "") {
          $("#pwdError").text("Password missing");
        } else {
          $("#pwdError").text("");
        }
        if (confirm === "") {
          $("#confirmError").text("Password confirmation missing");
        } else if(confirm != password) {
          $("#confirmError").text("Passwords dont' match");
        } else {
          $("#confirmError").text("");
        }
        // Select a country validation
        if(country == 0) {
          $("#countryError").text( "Select a country");
        } else {
          $("#countryError").text("");
        }
        // Select a gender validation
        if(!gender.is(":checked")) {
          $("#genderError").text("Please select a gender");
        } else {
          $("#genderError").text("");
        }
      }
    });
});
