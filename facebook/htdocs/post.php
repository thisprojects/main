<?php

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $firstname = $request->firstname;
  $lastname = $request->lastname;
  $id = $request->id;

  $error = "Connection failed: ";
  $success = "Connected succesfully";

$lastname = addslashes($lastname);
$servername = "localhost";
$username = "test";
$password = "testing";
$dbname = "myDB";

//if ($firstname == " "){

//  die
//}
class JASON {
      public $firstname = "";
      public $lastname  = "";
      public $constatus = "";
      public $exists = "";
      public $eventlist = [];
   }

   $e = new JASON();

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    $return = [connection_status => " connection failed "];
} else {
//  $return = [connection_status => " connection succesful "];
$e->constatus = "connection succesful";


$sql = "INSERT INTO users (firstname, lastname, idnumber)
VALUES ('$firstname', '$lastname', '$id')";
$checkuser ="SELECT * FROM users WHERE firstname = '$firstname' AND lastname = '$lastname' AND idnumber = '$id'";
$event = "SELECT * FROM events WHERE owner = '$id'";
$searchresult = $conn->query($checkuser);
$eventsearch = $conn->query($event);

if ($searchresult->num_rows > 0){

 //$return = [firstname => $firstname , lastname => $request->lastname , exists => "already exists"];
 $e->firstname = $firstname;
 $e->lastname = $request->lastname;
 $e->exists = "already exists";




          if ($eventsearch->num_rows > 0) {

            while($row = $eventsearch->fetch_assoc()) {
            //  array_push($e->eventlist, $row["ID"]);
            $e->eventlist[Events] [] = $row;
    // echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
 }


          }else{

            // $return->events = "No events";
            $e->eventslist = "no events";
          }

}else {

if ($conn->query($sql) === TRUE) {
    $return = [record_create => " New record created successfully"];
} else {
    $return .= " Error: " . $sql . " " . $conn->error;
}
}
}
$encode = json_encode($e);


  print_r($encode);




?>
