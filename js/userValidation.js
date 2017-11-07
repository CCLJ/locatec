registerForm.addEventListener("click",
  function() {
    // var subm = true;
    var message = "";
    if (document.getElementById('firstName').value === "") {
      // subm = false;
      document.getElementById("first").innerHTML = "First Name missing";
    } else {
      document.getElementById("first").innerHTML = "";
    }
    if (document.getElementById('lastName').value === "") {
      // subm = false;
      document.getElementById("last").innerHTML = "Last Name missing";
    } else {
      document.getElementById("last").innerHTML = "";
    }
    if (document.getElementById('username').value === "") {
      // subm = false;
      document.getElementById("userError").innerHTML = "Userame missing";
    } else {
      document.getElementById("userError").innerHTML = "";
    }
    if (document.getElementById('email').value === "") {
      // subm = false;
      document.getElementById("emailError").innerHTML = "Email missing";
    } else {
      document.getElementById("emailError").innerHTML = "";
    }
    if (document.getElementById('pwd').value === "") {
      // subm = false;
      document.getElementById("pwdError").innerHTML = "Password missing";
    } else {
      document.getElementById("pwdError").innerHTML = "";
    }
    if (document.getElementById('confirm').value === "") {
      // subm = false;
      document.getElementById("confirmError").innerHTML = "Confirmation missing";
    } else {
      document.getElementById("confirmError").innerHTML = "";
    }

    // Select a country validation
    country = document.getElementById("countries")
    if(country.options[country.selectedIndex].value == 0) {
      // subm = false;
      document.getElementById("countryError").innerHTML = "Select a country";
    } else {
      document.getElementById("countryError").innerHTML = "";
    }

    // Select a gender validation
    gender = document.getElementsByName("radioB");
    var checked = false;
    for (var i = 0; i < gender.length; i++) {
      if(gender[i].checked) {
        checked = true;
      }
    }
    if(!checked) {
      // subm = false;
      document.getElementById("genderError").innerHTML = "Please select a gender";
    } else {
      document.getElementById("genderError").innerHTML = "";
    }

  });

loginForm.addEventListener("click",
  function() {
    var subm = true;
    if (document.getElementById("user").value !== "lab6") {
      document.getElementById("userloginError").innerHTML = "Wrong username";
      subm = false;
    } else {
      document.getElementById("userloginError").innerHTML = "";
      subm = true;
    }
    if (document.getElementById("password").value !== "lab6") {
      document.getElementById("pwdloginError").innerHTML = "Wrong password";
      subm = false;
    } else {
      document.getElementById("pwdloginError").innerHTML = "";
      subm = true;
    }
    if(subm) {
      // login.action = "home.html"
      window.location.href = "home.html";
    }
  });
