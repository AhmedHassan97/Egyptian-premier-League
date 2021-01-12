<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require("./deleteAll.php");

require("./connection.php");
error_reporting(E_ERROR | E_PARSE);

$_REQUEST = json_decode(file_get_contents("php://input"),true);
$username=($_REQUEST['username']);
$password=($_REQUEST['password']);




$sql = "SELECT * from staduims";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    $stack = array();
;
    while ($row = $result->fetch_assoc()) {
        // $myObj->name = $row['username'];
        // $myObj->age = $row['pass'];
        $results = array(
            'staduimname' => $row['staduim_name'],
            'approved' => $row['approved'],
            'noOfRows' => $row['noOfRows'],
            'seatsPerRow' => $row['seatsPerRow']

       );
       array_push($stack, $results);               
        }
        $myJSON = json_encode($stack);
        echo $myJSON;
  } 
  
?>




