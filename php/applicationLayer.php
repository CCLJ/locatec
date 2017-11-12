<?php
	header('Content-type: application/json');
	header('Accept: application/json');
	require_once __DIR__ . '/dataLayer.php';

	$action = $_POST["action"];
	switch($action)
	{
		case "LOGIN":
            loginFunction();
						break;
		case "LOAD-OBJECTS":
						loadObjects();
						break;
		case "LOAD-CLAIMED":
						claimedObjects();
						break;
		case "CHECK-ROLE":
						checkRole();
						break;
		case "LOAD-USERS":
						loadUsers();
						break;
		case "LOAD-PROFILE":
						loadProfile();
						break;
		case "LOAD-USER":
						loadUser();
						break;
		case "SEARCH-OBJECTS":
						searchForObject();
						break;
		case "NEW-OBJECT":
						postNewObject();
						break;
		case "LOGOUT":
						logout();
						break;
		case "REFRESH-OBJECT":
					refreshObject();
					break;
	}

	function loginFunction()
	{
		$uName = $_POST["uName"];
		$uPassword = $_POST["uPassword"];
    $uRemember = $_POST["uRemember"];

		$loginResponse = attemptLogin($uName, $uPassword, $uRemember);

		if ($loginResponse["MESSAGE"] == "SUCCESS")
		{
			$response = array("firstname"=>$loginResponse["firstname"],
                        "lastname"=>$loginResponse["lastname"]);

      session_start();
      $_SESSION["mail"] = $uName;
			$_SESSION["role"] = $loginResponse["role"];
			$_SESSION["id"] = $loginResponse["id"];
      if($uRemember == "true") {
        setcookie("email", $uName, time()+ 60 * 60 * 24 * 30);
        setcookie("pwd", $uPassword, time()+ 60 * 60 * 24 * 30);
      }
			echo json_encode($response);
		}
		else
		{
			genericErrorFunction($loginResponse["MESSAGE"]);
		}
	}

	function genericErrorFunction($errorCode)
	{
		switch($errorCode)
		{
			case "500" : header("HTTP/1.1 500 Bad connection, portal down");
						 die("The server is down, we couldn't stablish the data base connection.");
						 break;
			case "406" : header("HTTP/1.1 406 User not found.");
						 die("Wrong credentials provided.");
             break;
			case "408" : header("HTTP/1.1 408 Friends list is empty.");
						 die("No friends in list yet.");
             break;
      case "409" : header("HTTP/1.1 409 User already exists");
             die("Give another email");
             break;
      case "410" : header("HTTP/1.1 410 User doesn't exists");
             die("User doesn't exists");
             break;
		  case "412" : header("HTTP/1.1 412 User already in friend list");
             die("User in friend list already");
             break;
		  case "413" : header("HTTP/1.1 413 Friend request already sent");
		 	  		 die("Friend request sent already");
		 		   	 break;
		  case "414" : header("HTTP/1.1 414 No pending friend requests");
		 	  		 die("No pending friend requests");
		 		  	 break;
		  case "415" : header("HTTP/1.1 415 Couldn't send friend request");
		 	  		 die("Something went wrong, request not sent");
		 		  	 break;
		  case "416" : header("HTTP/1.1 416 Couldn't add friend");
		 	  		 die("Something went wrong, friend not added");
		 		  	 break;
		  case "417" : header("HTTP/1.1 417 Couldn't add you to friend's friends list");
		 	  		 die("Something went wrong, you were not added to their list");
		 		  	 break;
		  case "418" : header("HTTP/1.1 418 Couldn't erase request from DB");
		 	  		 die("Something went wrong, request not deleted");
		 		  	 break;
			case "419" : header("HTTP/1.1 419 No retrieves");
						die("No retrieves");
						break;
		  case "420" : header("HTTP/1.1 420 No users in DB");
 					   die("There aren't any user in the DB");
 					   break;
			case "421" : header("HTTP/1.1 421 No objects retrieve");
						die("No objects with such characteristics");
						break;
			case "422" : header("HTTP/1.1 422 Couldn't insert new object");
						die("Couldn't insert new object");
						break;
			case "423" : header("HTTP/1.1 423 Couldn't refresh the DB");
						die("The data base couldn't refresh");
						break;

		}
	}


//Nuevo *******************************************************************************
	function loadObjects() {
		session_start();
		$Objects = getObjects();
		if ($Objects[0]["MESSAGE"] == "SUCCESS"){
			echo json_encode($Objects);
		} else {
			genericErrorFunction($Objects["MESSAGE"]);
		}
	}

	function claimedObjects() {
		session_start();
		$Objects = getClaimedObjects();
		if ($Objects[0]["MESSAGE"] == "SUCCESS"){
			echo json_encode($Objects);
		} else {
			genericErrorFunction($Objects["MESSAGE"]);
		}
	}

	function checkRole() {
		session_start();
		$user = $_SESSION["role"];
		if($user == "user") {
			echo json_encode(array("role"=>"user"));
		} else {
			echo json_encode(array("role"=>"admin"));
		}
	}

	function loadUsers(){
		session_start();
		$userList = getUsers();
		if ($userList[0]["MESSAGE"] == "SUCCESS"){
			echo json_encode($userList);
		} else {
			genericErrorFunction($userList[0]["MESSAGE"]);
		}
	}

	function loadProfile() {
		session_start();
		$role = $_SESSION["role"];
		if($role == "admin"){
			$user = $_POST["mail"];
		} else {
			$user = $_SESSION["mail"];
		}
		$profile = getProfile($user);
		if ($profile[0]["MESSAGE"] == "SUCCESS"){
			echo json_encode($profile);
		} else {
			genericErrorFunction($profile[0]["MESSAGE"]);
		}
	}

	function loadUser() {
		session_start();
		$role = $_SESSION["role"];
		if($role == "admin"){
			$user = $_POST["mail"];
		} else {
			$user = $_SESSION["mail"];
		}
		$profile = getUser($user);
		if ($profile["MESSAGE"] == "SUCCESS"){
			echo json_encode($profile);
		} else {
			genericErrorFunction($profile["MESSAGE"]);
		}
	}

	function searchForObject() {
		session_start();
		$key = $_POST["key"];
		$objects = getSearchResult($key);
		if ($objects[0]["MESSAGE"] == "SUCCESS"){
			echo json_encode($objects);
		} else {
			genericErrorFunction($objects[0]["MESSAGE"]);
		}
	}

	function postNewObject(){
		session_start();
		$object_name = $_POST["uName"];
		$object_desc = $_POST["uDescription"];
		$found_by = $_POST["uFoundBy"];

		$result = insertNewObject($object_name, $object_desc, $found_by);
		if($result["MESSAGE"] == "SUCCESS"){
			echo json_encode($result);
		} else {
			genericErrorFunction($result);
		}
	}

	function logout() {
		session_start();
		session_destroy();
		echo json_encode(array("destroyed"=>"Session destroyed"));
	}

	function refreshObject(){
		session_start();
		$who = $_SESSION["id"];
		$id = $_POST["id"];

		$refresh = refreshDB($who, $id);

		if ($refresh["MESSAGE"] == "SUCCESS"){
			echo json_encode($refresh);
		} else {
			genericErrorFunction($refresh);
		}
	}
?>
