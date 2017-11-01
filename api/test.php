<?php

  header('Content-type: application/json');
  header('Accept: application/json');
  // require_once __DIR__ . "/dataLayer.php";
  echo json_encode(array("result"=>"php api call works"));

?>
