<?php




  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $firstname = $request->firstname;
  $lastname = $request->lastname;
  $id = $request->id;

  $wibbins = "events";
  $stuff = "";

$lastname = addslashes($lastname);
$servername = "localhost";
$username = "test";
$password = "testing";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

function eventDB ($table, $where, $equals, $conn) { // takes in arguments + the mysqli object ($conn)

$x=[];

$dbVar = "SELECT * FROM $table WHERE $where = '$equals'";
$dbAction = $conn->query($dbVar);

if ($dbAction->num_rows > 0) {

       while($row = $dbAction->fetch_assoc()) {
       array_push($x, $row);
      }
      return $x;

}else{
        return "none";
      }



}


class JASON {
      public $firstname = "";
      public $lastname  = "";
      public $constatus = "";
      public $exists = "";
      public $eventlist = [];
      public $error = "";
      public $sublist = [];
      public $allevents = [];
   }

   $e = new JASON();



// Check connection
if ($conn->connect_error) {
    $e->constatus = "connection failed";
} else {

$e->constatus = "connection succesful";

$sql = "INSERT INTO users (firstname, lastname, idnumber)
VALUES ('$firstname', '$lastname', '$id')";
$checkuser ="SELECT * FROM users WHERE firstname = '$firstname' AND lastname = '$lastname' AND idnumber = '$id'";

$searchresult = $conn->query($checkuser);

if ($searchresult->num_rows > 0){

    $e->firstname = $firstname;
    $e->lastname = $request->lastname;
    $e->exists = "already exists";

    $bibbins = eventDB("events", "owner", $id, $conn);
    array_push($e->eventlist, $bibbins);

    $subbedEvents = eventDB("subscriptions", "owner", $id, $conn); // Args being passed are equiv to "SELECT * FROM subscriptions WHERE owner ='$id'";

      for ($i=0; $i < $subbedEvents; $i++){
        $stuff = $subbedEvents['eventID'];
        $matchSubbed = eventDB("events", "id", $stuff, $conn);   // "SELECT * FROM events WHERE id ='$stuff'";
        array_push($e->sublist, $matchSubbed);

      }


      }

}

if ($conn->query($sql) === TRUE) {
    $e->exists = "Record Created";
} else {
    $e->error = " Error: " . $sql . " " . $conn->error;
}


$encode = json_encode($e);


print_r($encode);




?>
