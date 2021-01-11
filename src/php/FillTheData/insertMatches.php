<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);




$sql = "INSERT INTO Matches (Matchid, homeTeam, awayTeam, staduim_Name_Match, matchDate, matchTime,mainRefree, lineman1,lineman2)
VALUES ('1', 'Arsenal', 'Manchester United', 'Anfield','2002-3-14','14:00', 'Youssef', 'Ali','Mohamed') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This Match already exists";
}

$sql = "INSERT INTO Matches (Matchid, homeTeam, awayTeam, staduim_Name_Match, matchDate, matchTime,mainRefree, lineman1,lineman2)
VALUES ('2', 'Barcelona', 'Manchester City', 'Goodison Park','2002-3-14','14:00', 'Youssef', 'Ali','Mohamed') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} else {
  echo  "This Match already exists";
}


?>