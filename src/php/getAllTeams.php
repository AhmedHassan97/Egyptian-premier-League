<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
require("./deleteAll.php");
require("./connection.php");
error_reporting(E_ERROR | E_PARSE);

$_REQUEST = json_decode(file_get_contents("php://input"),true);





$sql = "SELECT * from teams";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    $stack = array();
;
    while ($row = $result->fetch_assoc()) {
        
        $results = array(
            'teamname' => $row['team_name'],
            
       );
       array_push($stack, $results);               
        }
        $myJSON = json_encode($stack);
        echo $myJSON;
  }
  else{
    $stack = array();
    $myJSON = json_encode($stack);
    echo $myJSON;
  } 

?>




