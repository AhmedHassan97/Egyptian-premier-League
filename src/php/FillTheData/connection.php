<?php
    $servername = "localhost";    
    // Create connection
    $conn = new mysqli($servername, 'root', "","mydb");
    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    // $conn->close();
?>