<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);


$username=($_REQUEST['username']);


$password=($_REQUEST['password']);
if($password !== "")
{
    $sql = "UPDATE users SET pass= '$password' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "pass";
      } }

$firstname=($_REQUEST['firstname']);
if($firstname !== "")
{
    $sql = "UPDATE users SET firstname= '$firstname' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "first";
      } }

$lastname=($_REQUEST['lastname']);
if($lastname !== "")
{
    $sql = "UPDATE users SET lastname= '$lastname' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "last";
      } }

$birthdate=($_REQUEST['date']);
if($birthdate !== "")
{
    $sql = "UPDATE users SET birthdate= '$birthdate' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "date";
      } }

$gender=($_REQUEST['sex']);
if($gender !== "")
{
    $sql = "UPDATE users SET gender= '$gender' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "gender";
      } }

$city=($_REQUEST['city']);
if($city !== "")
{
    $sql = "UPDATE users SET city= '$city' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "city";
      } }

$address=($_REQUEST['address']);
if($address !== "")
{
    $sql = "UPDATE users SET adress= '$address' WHERE username='$username'";    
    if ($conn->query($sql) === TRUE) {
        // echo "adress";
      } 
}

$sql = "SELECT * from Users WHERE  username='$username'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
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
       
        $myJSON = json_encode($results);
        echo $myJSON;
    }
  }
?>