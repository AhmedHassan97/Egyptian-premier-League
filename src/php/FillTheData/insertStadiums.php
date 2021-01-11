<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);




$sql = "INSERT INTO Staduims (staduim_name, approved,noOfRows,seatsPerRow)
VALUES ('Anfield','1',6,5) 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This staduim_name already exists";
}

$sql = "INSERT INTO Staduims (staduim_name, approved,noOfRows,seatsPerRow)
VALUES ('Elland Road','0',5,6) 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This staduim_name already exists";
}
$sql = "INSERT INTO Staduims (staduim_name, approved,noOfRows,seatsPerRow)
VALUES ('Goodison Park','1',5,5) 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This staduim_name already exists";
}

?>