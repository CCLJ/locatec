<?php
  if (isset($_POST['submit']))
  {
    $con = mysql_connect("localhost","root","root");
    mysql_select_db("Locatec", $con);

    $imageName = mysql_real_escpae_string($_FILES["image"]["name"]);
    $imageData = mysql_real_escpae_string(file_get_contents($_FILES["image"]["tmp_name"]));

    $imageType = mysql_real_escpae_string($_FILES["image"]["type"]);

    if (substr($imageType,0,5) == "image"){
      echo "Working code";
    }
    else {
      echo "Only image are allowed";
    }

  }
?>
