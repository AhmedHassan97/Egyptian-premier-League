<?php
    $servername = "localhost";    
    $conn = new mysqli($servername, 'root', "","mydb");
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
?>