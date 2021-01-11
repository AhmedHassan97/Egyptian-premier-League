<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require("./connection.php");
require("./deleteAll.php");

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
VALUES ('Ahmed123', 'Ahmed', 'Gad', '20 June','qwertyu',' Male', 'Giza', 'Hadayek El Ahram','abc@gmail.com','1','1') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This userbname already exists";
}
$sql = "INSERT INTO Users (username, firstname, lastname, birthdate, pass, gender,city, adress,email,rule,approved)
VALUES ('Hassan123', 'Ahmed', 'Hassan', '23 January','bdviweuv',' Male', 'Giza', 'Dokki','efg@gmail.com','0','0') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This userbname already exists";
}
$sql = "INSERT INTO Users (username, firstname, lastname, birthdate, pass, gender,city, adress,email,rule,approved)
VALUES ('Nada123', 'Nada', 'Hesham', '14 August','sjdvbsidv',' Female', 'Giza', 'Haram','gih@gmail.com','1','1') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This userbname already exists";
}
$sql = "INSERT INTO Users (username, firstname, lastname, birthdate, pass, gender,city, adress,email,rule,approved)
VALUES ('Hany12345', 'Hany', 'Maged', '20 March','sdvsdvs',' Male', 'Giza', 'Maadi','cbv@gmail.com','1','1') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This userbname already exists";
}
$sql = "INSERT INTO Users (username, firstname, lastname, birthdate, pass, gender,city, adress,email,rule,approved)
VALUES ('Sherif1234', 'Sherif', 'Gad', '20 June','fbdbdfbdf',' Male', 'Giza', 'Hadayek El Ahram','zxc@gmail.com','0','0') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This userbname already exists";
}


?>