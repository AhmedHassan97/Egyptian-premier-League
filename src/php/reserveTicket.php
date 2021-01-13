<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$matchId_Ticket=($_REQUEST['matchId_Ticket']);
$userName_Ticket=($_REQUEST['userName_Ticket']);
$seats=($_REQUEST['seats']);
$staduim_Name_Ticket=($_REQUEST['staduim_Name_Ticket']);
$reserve=($_REQUEST['reserve']);
if($reserve == true){    
    foreach ($seats as $seat){
        $sql = "INSERT INTO ticketsreservation (matchId_Ticket, userName_Ticket, seatNumber, staduim_Name_Ticket)
    VALUES ('$matchId_Ticket', '$userName_Ticket', '$seat','$staduim_Name_Ticket') 
    ";
    if ($conn->query($sql) === TRUE) {
    echo true;
    } else {
      echo  "This ticket is already reserved";
    }
    }
    
}
else{
    
    $sql = "DELETE FROM ticketsreservation WHERE matchId_Ticket= '$matchId_Ticket' AND  seatNumber='$seatNumber'
    ";
    if ($conn->query($sql) === TRUE) {
    echo true;
    } else {
    //   echo  "This userbname already exists";
    }

}


?>