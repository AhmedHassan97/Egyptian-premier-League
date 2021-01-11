<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);



$homeTeam=($_REQUEST['hometeam']);
$awayTeam=($_REQUEST['awayteam']);
$staduim_Name_Match=($_REQUEST['stad']);
$matchDate=($_REQUEST['date']);
$matchTime=($_REQUEST['time']);
$mainRefree=($_REQUEST['mainrefree']);
$lineman1=($_REQUEST['lineman1']);
$lineman2=($_REQUEST['lineman2']);



$sql = "INSERT INTO matches (homeTeam, awayTeam, staduim_Name_Match, matchDate, matchTime, mainRefree,lineman1, lineman2)
VALUES ('$homeTeam', '$awayTeam', '$staduim_Name_Match', '$matchDate','$matchTime',' $mainRefree', '$lineman1', '$lineman2') 
";
if ($conn->query($sql) === TRUE) {
  echo true;
} 
?>