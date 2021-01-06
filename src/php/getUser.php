<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require("./connection.php");
error_reporting(E_ERROR | E_PARSE);

$_REQUEST = json_decode(file_get_contents("php://input"),true);
$username=($_REQUEST['username']);
$password=($_REQUEST['password']);




$sql = "SELECT * from Users WHERE  username='$username' and pass='$password'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $myObj->name = $row['username'];
        $myObj->age = $row['pass'];
        $myJSON = json_encode($myObj);
        echo $myJSON;
    }
  } else {
    echo "0 results";
  }


?>




