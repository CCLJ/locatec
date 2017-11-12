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
														"role"=>$row["role"],
														"id" => $row["institution_id"],
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

	function date_sort($a, $b){
		return strtotime($b["date_claimed"]) - strtotime($a["date_claimed"]);
	}

	function getClaimedObjects(){
		$connection = databaseConnection();
		if ($connection != null){
			$sql = "SELECT * FROM Objects WHERE status = 'claimed'";
			$results = $connection -> query($sql);
			if ($results > 0){
				while ($row = $results->fetch_assoc()) {
					session_start();
					if($_SESSION["role"] == "admin"){
						$objects[] = array("id" => $row["id"],
															 	"name" => $row["name"],
															 	"date_found" => $row["date_found"],
																"date_claimed" => $row["date_claimed"],
																"description" => $row["description"],
																"imageURL" => $row["imageURL"],
																"found_by" => $row["found_by"],
																"claimed_by" => $row["claimed_by"],
																"posted_by" => $row["posted_by"],
																"role" => "admin",
																"MESSAGE" => "SUCCESS");
					} else {
						$objects[] = array("id" => $row["id"],
															 	"name" => $row["name"],
															 	"date_found" => $row["date_found"],
																"date_claimed" => $row["date_claimed"],
																"description" => $row["description"],
																"imageURL" => $row["imageURL"],
																"found_by" => $row["found_by"],
																"claimed_by" => $row["claimed_by"],
																"posted_by" => $row["posted_by"],
																"role" => "user",
																"MESSAGE" => "SUCCESS");
					}
				}
				usort($objects, "date_sort");
				$connection->close();
				return $objects;
			} else {
				return array("MESSAGE" => "404");
			}
		} else {
			return array("MESSAGE" => "500");
		}
	}

	function getUsers(){
		$connection = databaseConnection();
		if ($connection != null){
			$sql = "SELECT * FROM Users";
			$results = $connection -> query($sql);
			if ($results > 0){
				while($row = $results->fetch_assoc()){
					$list[] = array("fName" => $row["fName"],
													"lName" => $row["lName"],
													"institution_id" => $row["institution_id"],
													"email" => $row["email"],
													"MESSAGE" => "SUCCESS");
				}
				$connection -> close();
				return $list;
			} else {
				return array(array("MESSAGE" => "420"));
			}
		} else {
			return array(array("MESSAGE" => "500"));
		}
	}

	function getProfile($user){
		$connection = databaseConnection();
		if($connection != null){
			$sql = "SELECT * FROM Users, Objects WHERE Objects.claimed_by = Users.institution_id AND Users.email = '$user'";
			$results = $connection -> query($sql);
			if ($results > 0) {
				while($row = $results->fetch_assoc()){
					$profile[] = array("name" => $row["name"],
														 "date_found" => $row["date_found"],
													 	 "date_claimed" => $row["date_claimed"],
														 "imageURL" => $row["imageURL"],
														 "found_by" => $row["found_by"],
														 "posted_by" => $row["posted_by"],
														 "MESSAGE" => "SUCCESS");
				}
				$connection -> close();
				return $profile;
			} else {
				$connection->close();
				return array(array("MESSAGE"=>"419"));
			}
		} else {
			return array(array("MESSAGE"=>"500"));
		}
	}

	function getUser($user) {
		$connection = databaseConnection();
		if($connection != null){
			$sql = "SELECT * FROM Users WHERE email = '$user'";
			$results = $connection -> query($sql);
			if ($results > 0) {
				while($row = $results->fetch_assoc()){
					$profile = array("fname" => $row["fName"],
														 "lname" => $row["lName"],
														 "email" => $row["email"],
													 	 "institution_id" => $row["institution_id"],
														 "MESSAGE" => "SUCCESS");
				}
				$connection -> close();
				return $profile;
			} else {
				$connection->close();
				return array(array("MESSAGE"=>"410"));
			}
		} else {
			return array(array("MESSAGE"=>"500"));
		}
	}

	function getSearchResult($key){
		$connection = databaseConnection();
		if ($connection != null){
			$sql = "SELECT * FROM Objects WHERE name = '$key'
																		OR date_found = '$key'
																		OR description LIKE '%{$key}%'";
			$results = $connection -> query($sql);
			if ($results > 0){
				while($row = $results-> fetch_assoc()){
					$objects[] = array("id" => $row["id"],
														 	"name" => $row["name"],
														 	"date_found" => $row["date_found"],
															"date_claimed" => $row["date_claimed"],
															"description" => $row["description"],
															"imageURL" => $row["imageURL"],
															"found_by" => $row["found_by"],
															"claimed_by" => $row["claimed_by"],
															"posted_by" => $row["posted_by"],
															"MESSAGE" => "SUCCESS");
				}
				$connection -> close();
				return $objects;
			} else {
				return array(array("MESSAGE" => "421"));
			}
		} else {
			return array(array("MESSAGE" => "500"));
		}
	}

	function insertNewObject($name, $desc, $by){
		$connection = databaseConnection();
		if ($connection != null){
			$date = date("Y-m-d");
			$sql = "INSERT INTO Objects (name, date_found, description, imageURL, status, found_by, posted_by)
							VALUES ('$name', '$date', '$desc', 'url dummy', 'not_claimed', '$by', 'admin')";
			if ($connection -> query($sql) === TRUE){
				return array("MESSAGE" => "SUCCESS");
			} else {
				return array("MESSAGE" => "422");
			}
		} else {
			return array("MESSAGE" => "500");
		}
	}

	function refreshDB($by, $id){
		$date = date("Y-m-d");
		$connection = databaseConnection();
		if ($connection != null){
			$sql = "UPDATE Objects SET date_claimed = '$date', status = 'claimed', claimed_by = '$by' WHERE id = '$id'";
			if ($connection -> query($sql) === TRUE){
				$connection -> close();
				return array("MESSAGE" => "SUCCESS");
			} else {
				$connection -> close();
				return array("MESSAGE" => "423");
			}
		} else {
			$connectino -> close();
			return array("MESSAGE" => "500");
		}
	}
?>
