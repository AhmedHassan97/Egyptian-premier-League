<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");
require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$username=($_REQUEST['username']);


if($_REQUEST['approved']==="no")
{
    $sql = "DELETE FROM Users
    WHERE username = '$username'";    
}
else{
    $sql = "UPDATE Users SET approved= 1 WHERE username='$username'";    
}
if ($conn->query($sql) === TRUE) {
  echo true;
} 
// else {
//   echo  "This userbname already exists";
// }


?>