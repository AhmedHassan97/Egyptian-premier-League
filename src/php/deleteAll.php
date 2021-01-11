<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);

$sql = "DELETE FROM Users WHERE username=''";

if ($conn->query($sql) === TRUE) {
} else {
}

$sql = "DELETE FROM Staduims WHERE staduim_name=''";

if ($conn->query($sql) === TRUE) {
} else {
}

$sql = "DELETE FROM Teams WHERE team_name=''";

if ($conn->query($sql) === TRUE) {
} else {
}

$sql = "DELETE FROM Matches WHERE homeTeam=''";

if ($conn->query($sql) === TRUE) {
} else {
}

$sql = "DELETE FROM TicketsReservation WHERE userName_Ticket=''";

if ($conn->query($sql) === TRUE) {
} else {
}


?>