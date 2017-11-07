$(document).ready( function(){

  $("#registerForm").on("click",
    function() {
      // var subm = true;
      var message = "";
      if ($('#firstName').val() === "") {
        // subm = false;
        $("#first").text("First Name missing");
      } else {
        $("#first").text("");
      }
      if ($('#lastName').val() === "") {
        // subm = false;
        $("#last").text("Last Name missing");
      } else {
        $("#last").text("");
      }
      if ($('#username').val() === "") {
        // subm = false;
        $("#userError").text("Userame missing");
      } else {
        $("#userError").text("");
      }
      if ($('#email').val() === "") {
        // subm = false;
        $("#emailError").text("Email missing");
      } else {
        $("#emailError").text("");
      }
      if ($('#pwd').val() === "") {
        // subm = false;
        $("#pwdError").text("Password missing");
      } else {
        $("#pwdError").text("");
      }
      if ($('#confirm').val() === "") {
        // subm = false;
        $("#confirmError").text("Confirmation missing");
      } else {
        $("#confirmError").text("");
      }

      // Select a country validation
      country = $("#countries")
      if(country.val() == 0) {
        // subm = false;
        $("#countryError").text( "Select a country");
      } else {
        $("#countryError").text("");
      }

      // Select a gender validation
      gender = $("#input[type='radio'][name='radioB']");
      if(!gender.is(":checked")) {
        // subm = false;
        $("#genderError").text("Please select a gender");
      } else {
        $("#genderError").text("");
      }

    });

  $("#loginForm").on("click",
    function() {

      var subm = true;
      if ($("#user").val() !== "lab5") {
        $("#userloginError").text("Wrong username");
        subm = false;
      } else {
        $("userloginError").text("");
        subm = true;
      }
      if ($("#password").val() !== "lab5") {
        $("#pwdloginError").text("Wrong password");
        subm = false;
      } else {
        $("#pwdloginError").text("");
        subm = true;
      }
      if(subm) {
        // login.action = "home.html"
        document.location.href = "home.html";
      }
    });
});
