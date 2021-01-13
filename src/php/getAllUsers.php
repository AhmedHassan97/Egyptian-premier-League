<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require("./connection.php");
error_reporting(E_ERROR | E_PARSE);

$_REQUEST = json_decode(file_get_contents("php://input"),true);





$sql = "SELECT * from users";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    $stack = array();
;
    while ($row = $result->fetch_assoc()) {
        
        $results = array(
            'username' => $row['username'],
            'password'=>$row['pass'],
            'firstname'=>$row['firstname'],
            'lastname'=>$row['lastname'],
            'birthdate'=>$row['birthdate'],
            'gender'=>$row['gender'],
            'city'=>$row['city'],
            'address'=>$row['adress'],
            'email'=>$row['email'],
            'role'=>$row['rule'],
            'approved'=>$row['approved'],
            'admin'=>$row['adm']
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




