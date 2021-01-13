<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$staduim_name=($_REQUEST['stadname']);
$approved=($_REQUEST['approved']);
$seatsPerRow=($_REQUEST['seatsPerRow']);
$noOfRows=($_REQUEST['noOfRows']);


$sql = "INSERT INTO staduims (staduim_name, approved,noOfRows,seatsPerRow)
VALUES ('$staduim_name', '$approved','$noOfRows','$seatsPerRow') 
";
if (mysqli_query($conn, $sql)) {
  echo true;
} 
else
{
  echo "0";
}
?>