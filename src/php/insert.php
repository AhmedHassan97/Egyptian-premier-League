<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$email=($_REQUEST['email']);
$password=($_REQUEST['password']);
$firstname=($_REQUEST['firstname']);
$lastname=($_REQUEST['lastname']);
$username=($_REQUEST['username']);
$date=($_REQUEST['date']);
$sex=($_REQUEST['sex']);
$role=($_REQUEST['role']);
$city=($_REQUEST['city']);
$address=($_REQUEST['address']);
$approved=($_REQUEST['approved']);

$sql = "INSERT INTO Users (username, firstname, lastname, birthdate, pass, gender,city, adress,email,rule,approved)
VALUES ('$username', '$firstname', '$lastname', '$date','$password',' $sex', '$city', '$address','$email','$role','$approved') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This username or the email already exists";
}


?>