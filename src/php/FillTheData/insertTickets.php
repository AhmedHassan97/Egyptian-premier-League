<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require("./connection.php");
require("./deleteAll.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$sql = "INSERT INTO TicketsReservation (Ticketid, matchId_Ticket, userName_Ticket,seatNumber, staduim_Name_Ticket)
VALUES ('1', '1','Ahmed123','4','Anfield') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This reservation already exists";
}
$sql = "INSERT INTO TicketsReservation (Ticketid, matchId_Ticket, userName_Ticket,seatNumber, staduim_Name_Ticket)
VALUES ('2', '2','Sherif1234','4','Goodison Park') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This reservation already exists";
}
$sql = "INSERT INTO TicketsReservation (Ticketid, matchId_Ticket, userName_Ticket,seatNumber, staduim_Name_Ticket)
VALUES ('3', '1','Hassan123','5','Anfield') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This reservation already exists";
}


?>