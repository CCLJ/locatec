<?php

	function databaseConnection()
	{
		$servername = "localhost";
		$username = "root";
		$password = "root";
		$dbname = "Locatec";

		$conn = new mysqli($servername, $username, $password, $dbname);

		if ($conn->connect_error)
		{
			return null;
		}
		else
		{
			return $conn;
		}
	}

	function attemptLogin($userMail, $userPassword, $remember)
	{
		$connection = databaseConnection();

		if ($connection != null)
		{
			$sql = "SELECT * FROM Users WHERE email = '$userMail' AND pwd = '$userPassword'";
			$result = $connection->query($sql);

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc())
				{
					$response = array("firstname"=>$row["fName"],
                            "lastname"=>$row["lName"],
                            "MESSAGE"=>"SUCCESS");
				}
				$connection->close();
				return $response;
			}
			else
			{
				$connection->close();
				return array("MESSAGE"=>"406");
			}
		}
		else
		{
			return array("MESSAGE"=>"500");
		}
	}

  function attemptRegister($uName, $uPassword, $uFirstName, $uLastName, $uEmail, $uCountry, $uGender)
  {
    $connection = databaseConnection();
    if($connection != null) {

      $sql = "SELECT * FROM Users WHERE email = '$uEmail'";
      $result = $connection -> query($sql);

      if($result->num_rows > 0) {
        $connection->close();
        return array("MESSAGE"=>"409");
      } else {
        $sql = "INSERT INTO Users (fName, lName, username, email, pwd, country, gender)
        VALUES ('$uFirstName', '$uLastName', '$uName', '$uEmail', '$uPassword', '$uCountry', '$uGender')";
        if($connection -> query($sql) == true) {
          $response = array("firstname"=>$uFirstName,
                            "lastname"=>$uLastName,
                            "username"=>$uName,
                            "email"=>$uEmail,
                            "country"=>$uCountry,
                            "gender"=>$uGender,
                            "MESSAGE"=>"SUCCESS");
          $connection->close();
          return $response;
        } else {
          $connection->close();
          return array("MESSAGE"=>"500");
        }
      }
    } else {
      return array("MESSAGE"=>"500");
    }
  }

  function attemptAddComment($uMail, $uComment) {
    $connection = databaseConnection();

    if($connection != null) {

      $sql = "SELECT * FROM Users WHERE email = '$uMail'";
      $result = $connection -> query($sql);

      if($result->num_rows <= 0) {
        $connection->close();
        return array("MESSAGE"=>"410");
      } else {
        $sql = "INSERT INTO Comments (email, comment) VALUES ('$uMail', '$uComment')";
        if($connection -> query($sql)){
          $response = array("result"=>"Comment Added",
                            "user"=>$uMail,
                            "comment"=>$uComment,
                            "MESSAGE"=>"SUCCESS");
          $connection->close();
          return $response;
        } else {
          $connection->close();
          return array("MESSAGE"=>"500");
        }
      }

    } else {
      return array("MESSAGE"=>"500");
    }
  }

  function attemptLoadComments() {
    $connection = databaseConnection();

    if($connection != null) {

      $sql = "SELECT * FROM Comments, Users WHERE Comments.email = Users.email";
			$results = $connection -> query($sql);
			// $index = 0;
      $response = array();
			if($results -> num_rows > 0) {
				while ($row = $results->fetch_assoc()) {
					$response[] = array("comment" => $row["comment"],
															"user" => $row["email"],
                              "MESSAGE" => "SUCCESS");
					// $index = $index + 1;
				}
        $connection->close();
				return $response;
			} else {
        $connection->close();
        return array(array("MESSAGE"=>"406"));
			}

    } else {
      return array(array("MESSAGE"=>"500"));
    }
  }

	function attemptLoadProfile($uMail) {
		$connection = databaseConnection();

		if($connection != null) {
			$sql = "SELECT * FROM Users WHERE email='$uMail'";
			$results = $connection -> query($sql);
			if($results -> num_rows > 0) {
				while ($row = $results->fetch_assoc()) {
					$response = array("firstname" => $row["fName"],
														"lastname" => $row["lName"],
														"username" => $row["username"],
														"email" => $row["email"],
														"country" => $row["country"],
														"gender" => $row["gender"],
														"MESSAGE" => "SUCCESS");
				}
				return $response;
			} else {
				return array("MESSAGE"=>"406");
			}

		} else {
			return array("MESSAGE"=>"500");
		}

	}

	function attemptLoadFriends($uMail) {
		$connection = databaseConnection();

		if($connection != null) {

			$sql = "SELECT *, Users.email AS u_email FROM Friends, Users WHERE Friends.email = '$uMail' AND Friends.friend = Users.email";
			$results = $connection -> query($sql);

			if($results -> num_rows > 0) {
				while ($row = $results->fetch_assoc()) {
					$response[] = array("email" => $row["u_email"],
															"username" => $row["username"],
															"firstname" => $row["fName"],
															"lastname" => $row["lName"],
															"country" => $row["country"],
															"gender" => $row["gender"],
                              "MESSAGE" => "SUCCESS");
					// $index = $index + 1;
				}
        $connection->close();
				return $response;
			} else {
        $connection->close();
        return array(array("MESSAGE"=>"408"));
			}

		} else {
			return array(array("MESSAGE"=>"500"));
		}
	}

	function attemptFindFriends($uMail, $uSearch) {

		// First check fi user exists
		// if it exists, check it is not your friend already
		// then check if you have not sent a request already

		$connection = databaseConnection();

		if($connection != null) {

			$sql = "SELECT email FROM Users WHERE Users.email = '$uSearch' OR Users.username = '$uSearch'";
			$results = $connection -> query($sql);

			if($results -> num_rows > 0) {

				$row = $results->fetch_assoc();
				$friendEmail = $row["email"];
				$sql = "SELECT * FROM Friends WHERE email='$uMail' AND friend='$friendEmail'";
				$results = $connection -> query($sql);

				if($results -> num_rows > 0) {
					// We already have that friend
					$connection->close();
					return array(array("MESSAGE"=>"412"));
				} else {
					$sql = "SELECT * FROM Requests WHERE email='$friendEmail' AND who='$uMail'";
					$results = $connection -> query($sql);

					if($results -> num_rows > 0) {
						// We already sent a friend request
						$connection->close();
						return array(array("MESSAGE"=>"413"));
					} else {
						$sql = "SELECT * FROM Users WHERE Users.email = '$friendEmail'";
						$results = $connection -> query($sql);
						while ($row = $results->fetch_assoc()) {
							$response[] = array("email" => $row["email"],
																	"username" => $row["username"],
																	"firstname" => $row["fName"],
																	"lastname" => $row["lName"],
																	"country" => $row["country"],
																	"gender" => $row["gender"],
		                              "MESSAGE" => "SUCCESS");
						}
		        $connection->close();
						return $response;
					}
				}

			} else {
				// User not found
				$connection->close();
				return array(array("MESSAGE"=>"406"));
			}

		} else {
			return array(array("MESSAGE"=>"500"));
		}
	}

	function attemptLoadRequests($uMail) {
		$connection = databaseConnection();

		if($connection != null) {

			$sql = "SELECT * FROM Requests WHERE email='$uMail'";
			$results = $connection->query($sql);

			if($results -> num_rows > 0) {
				while ($row2 = $results->fetch_assoc()) {
					$person = $row2["who"];
					$sql = "SELECT * FROM Users WHERE email='$person'";
					$result = $connection->query($sql);
					$row = $result->fetch_assoc();
					$response[] = array("email" => $row["email"],
															"username" => $row["username"],
															"firstname" => $row["fName"],
															"lastname" => $row["lName"],
															"country" => $row["country"],
															"gender" => $row["gender"],
															"MESSAGE" => "SUCCESS");
				}

				$connection->close();
				return $response;
			} else {
				$connection->close();
				return array(array("MESSAGE"=>"414"));
			}

		} else {
			return array(array("MESSAGE"=>"500"));
		}
	}

	function attempAddFriend($me, $friend) {
		$connection = databaseConnection();
		if($connection != null) {
			$sql = "INSERT INTO Requests (email, who) VALUES ('$friend', '$me')";
			$result = $connection->query($sql);
			if($result) {
				$connection->close();
				return array("MESSAGE"=>"SUCCESS");
			} else {
				$connection->close();
				return array("MESSAGE"=>"415");
			}

		} else {
			return array("MESSAGE"=>"500");
		}
	}

	function attempAccept($me, $friend) {
		$connection = databaseConnection();
		if($connection != null) {
			$sql = "INSERT INTO Friends (email, friend) VALUES ('$me', '$friend')";
			if($connection -> query($sql)) {
				$sql = "INSERT INTO Friends (email, friend) VALUES ('$friend', '$me')";
				if($connection->query($sql)) {
					$sql = "DELETE FROM Requests WHERE email='$me' AND who='$friend'";
					if($connection->query($sql)) {
						$connection->close();
						return array("MESSAGE"=>"SUCCESS");
					} else {
						$connection->close();
						return array("MESSAGE"=>"418");
					}
				} else {
					$connection->close();
					return array("MESSAGE"=>"417");
				}
			} else {
				$connection->close();
				return array("MESSAGE"=>"416");
			}
		} else {
			return array("MESSAGE"=>"500");
		}
	}

	function attempReject($me, $friend) {
		$connection = databaseConnection();
		if($connection != null) {
			$sql = "DELETE FROM Requests WHERE email='$me' AND who='$friend'";
			if($connection->query($sql)) {
				$connection->close();
				return array("MESSAGE"=>"SUCCESS");
			} else {
				$connection->close();
				return array("MESSAGE"=>"418");
			}
		} else {
			return array("MESSAGE"=>"500");
		}
	}

	// NUEVO **********************************************************************************

	function getObjects(){
		$connection = databaseConnection();
		if ($connection != null){
			$sql = "SELECT * FROM Objects WHERE status = 'not_claimed'";
			$results = $connection -> query($sql);
			if ($results > 0){
				while ($row = $results->fetch_assoc()) {
					$objects[] = array("id" => $row["id"],
														 	"name" => $row["name"],
														 	"date_found" => $row["date_found"],
															"description" => $row["description"],
															"imageURL" => $row["imageURL"],
															"found_by" => $row["found_by"],
															"posted_by" => $row["posted_by"],
															"MESSAGE" => "SUCCESS");
				}
				$connection->close();
				return $objects;
			} else {
				return array("MESSAGE" => "404");
			}
		} else {
			return array("MESSAGE" => "500");
		}
	}
?>
