<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
require("./deleteAll.php");

require("./connection.php");

$_REQUEST = json_decode(file_get_contents("php://input"),true);


$id=($_REQUEST['id']);

$homeTeam=($_REQUEST['hometeam']);
$awayTeam=($_REQUEST['awayteam']);

if($homeTeam !== "")
{
    $sql = "UPDATE matches SET homeTeam= '$homeTeam' WHERE Matchid='$id'" ;
    if ($conn->query($sql) === TRUE) {
        echo true;
      } 
}

if($awayTeam !== "")
{
    $sql = "UPDATE matches SET awayTeam= '$awayTeam' WHERE Matchid='$id'" ;
    if ($conn->query($sql) === TRUE) {
        echo true;
      } 
}
         
$staduim_Name_Match=($_REQUEST['stad']);
if($staduim_Name_Match !== "")
{
    $sql = "UPDATE matches SET staduim_Name_Match= '$staduim_Name_Match' WHERE Matchid='$id'";    
    if ($conn->query($sql) === TRUE) {
        echo true;
      } }

$matchDate=($_REQUEST['date']);
if($matchDate !== "")
{
    $sql = "UPDATE matches SET matchDate= '$matchDate' WHERE Matchid='$id'";    
    if ($conn->query($sql) === TRUE) {
        echo true;
      } 
}

$matchTime=($_REQUEST['time']);
if($matchTime !== "")
{
    $sql = "UPDATE matches SET matchTime= '$matchTime' WHERE Matchid='$id'";    
    if ($conn->query($sql) === TRUE) {
        echo true;
      } 
}

$mainRefree=($_REQUEST['mainrefree']);
if($homeTeam !== "")
{
    $sql = "UPDATE matches SET mainRefree= '$mainRefree' WHERE Matchid='$id'";    
    if ($conn->query($sql) === TRUE) {
        echo true;
      } }

$lineman1=($_REQUEST['lineman1']);
if($lineman1 !== "")
{
    $sql = "UPDATE matches SET lineman1= '$lineman1' WHERE Matchid='$id'";   
    if ($conn->query($sql) === TRUE) {
        echo true;
      } }

$lineman2=($_REQUEST['lineman2']);
if($lineman2 !== "")
{
    $sql = "UPDATE matches SET lineman2= '$lineman2' WHERE Matchid='$id'";    
    if ($conn->query($sql) === TRUE) {
        echo true;
      } }
?>