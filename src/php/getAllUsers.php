<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require("./connection.php");
error_reporting(E_ERROR | E_PARSE);

$_REQUEST = json_decode(file_get_contents("php://input"),true);
$username=($_REQUEST['username']);
$password=($_REQUEST['password']);




$sql = "SELECT * from users";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    $stack = array();
;
    while ($row = $result->fetch_assoc()) {
        // $myObj->name = $row['username'];
        // $myObj->age = $row['pass'];
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
  } else {
    echo "0 results";
  }


?>




