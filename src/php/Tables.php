<?php
    require("./connection.php");
// -----------------------------------------------------USERS--------------------------------------
    // sql to create table
    $sql = "CREATE TABLE Users (
    username VARCHAR(30) NOT NULL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    birthdate VARCHAR(30) NOT NULL,
    pass VARCHAR(30) NOT NULL,
    gender VARCHAR(30) NOT NULL,
    city VARCHAR(30) Not NULL,
    adress VARCHAR(30),
    email VARCHAR(50) NOT NULL,
    rule BOOLEAN NOT NULL, 
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    adm BOOLEAN NOT NULL DEFAULT FALSE

    )";
    if ($conn->query($sql) === TRUE) {
    echo "Table Users created successfully";
    } else {
    echo "Error creating table: " . $conn->error;
    }
// -----------------------------------------------------STADUIMS--------------------------------------    
    $sql = "CREATE TABLE Staduims (
        staduim_name VARCHAR(30) NOT NULL PRIMARY KEY,
        approved BOOLEAN NOT NULL
        )";

    if ($conn->query($sql) === TRUE) {
    echo "Table satduims created successfully";
    } else {
    echo "Error creating table: " . $conn->error;
    }
// -----------------------------------------------------TEAMS--------------------------------------
    $sql = "CREATE TABLE Teams (
        team_name VARCHAR(30) NOT NULL PRIMARY KEY
        )";
        
    if ($conn->query($sql) === TRUE) {
    echo "Table Teams created successfully";
    } else {
    echo "Error creating table: " . $conn->error;
    }
// -----------------------------------------------------MATCH--------------------------------------
    $sql = "CREATE TABLE Matches (
        Matchid INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        homeTeam VARCHAR(30) NOT NULL ,
        awayTeam VARCHAR(30) NOT NULL ,
        staduim_Name_Match VARCHAR(30) NOT NULL ,
        matchDate DATE NOT NULL ,
        matchTime TIME NOT NULL,
        mainRefree VARCHAR(30) NOT NULL,
        lineman1 VARCHAR(30) NOT NULL,
        lineman2 VARCHAR(30) NOT NULL,
        avaliableSeats INT(6) NOT NULL DEFAULT 30,
        CONSTRAINT f1_name FOREIGN KEY (homeTeam) REFERENCES Teams(team_name) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT f2_name FOREIGN KEY (awayTeam) REFERENCES Teams(team_name) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT f3_name FOREIGN KEY (staduim_Name_Match) REFERENCES Staduims(staduim_name) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT f8_name CHECK (homeTeam <> awayTeam)

        )";
        
    if ($conn->query($sql) === TRUE) {
    echo "Table matches created successfully";
    } else {
    echo "Error creating table: " . $conn->error;
    }
// -----------------------------------------------------Tickets--------------------------------------
    $sql = "CREATE TABLE TicketsReservation (
        Ticketid INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        matchId_Ticket  INT(6) UNSIGNED NOT NULL,
        userName_Ticket VARCHAR(30) NOT NULL,
        seatNumber INT(6) NOT NULL,
        staduim_Name_Ticket VARCHAR(30) NOT NULL,

        CONSTRAINT f4_name FOREIGN KEY (matchId_Ticket) REFERENCES Matches(Matchid) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT f5_name FOREIGN KEY (userName_Ticket) REFERENCES Users(username) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT f6_name FOREIGN KEY (staduim_Name_Ticket) REFERENCES Staduims(staduim_name) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT f7_name Unique (seatNumber,matchId_Ticket)
        )";
        
    if ($conn->query($sql) === TRUE) {
    echo "Table TicketsReservation created successfully";
    } else {
    echo "Error creating table: " . $conn->error;
    }
    
    // $conn->close();
?>