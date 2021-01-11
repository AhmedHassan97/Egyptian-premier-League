<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require("./connection.php");
require("./deleteAll.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$sql = "INSERT INTO Teams (team_name)
VALUES ('Arsenal') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This Team name already exists";
}

$sql = "INSERT INTO Teams (team_name)
VALUES ('Barcelona') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This Team name already exists";
}

$sql = "INSERT INTO Teams (team_name)
VALUES ('Manchester City') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This Team name already exists";
}

$sql = "INSERT INTO Teams (team_name)
VALUES ('Manchester United') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This Team name already exists";
}

?>