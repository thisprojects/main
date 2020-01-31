<?php




  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);

  $wibbins = "events";
  $stuff = "";


$servername = "localhost";
$username = "test";
$password = "testing";
$dbname = "myDB";

$conn = new mysqli($servername, $username, $password, $dbname);

function eventDB2 ($table, $where, $equals, $conn) { // takes in arguments + the mysqli object ($conn)

                  $x=[];  // creates empty return array
                  $dbVar = "SELECT * FROM $table WHERE $where LIKE '$equals'"; // creates variable with SQL query info from function args
                  $dbAction = $conn->query($dbVar); // creates variable with mysqli method and above sql query variable

                  if ($dbAction->num_rows > 0) { // if there are any rows in the table queried
                      while($row = $dbAction->fetch_assoc()) { // for each row push an entry into the array we created above
                          array_push($x, $row);
                     }

                      return $x; // once all rows have been pushed to the array - return it

                  }else{

                      array_push($x, "none");
                      return $x; // if there are no rows we push "none" into the array and return it
                  }
}


function crossRef ($someArray, $conn) {

$x=[];

if ($someArray[0] == "none"){


  return;



}else{

  for ($i=0; $i < count($someArray); $i++){ // loop through the users subscribed events list
        $stuff = $someArray[$i]['eventID']; //capture current subsribed eventID in $stuff variable
        $match = eventDB2("events", "id", $stuff, $conn); //query the event table with the eventID taken from the subscription table
        array_push($x, $match[0]); // push the matched events to the JSON object

}
  return $x;
}
}

class JASON { // setup a class to handle our JSON info
      public $firstname = "";
      public $lastname  = "";
      public $constatus = "";
      public $exists = "";
      public $eventlist = [];
      public $error = "";
      public $sublist = [];
      public $allevents = [];
      public $test = [];
      public $comments = [];


   }

   $e = new JASON(); // create a new object from our JASON class
// Check connection
if ($conn->connect_error) { // if the DB returns an error when we try to connect
    $e->constatus = "connection failed";

} else { // if the DB connection is a success

$e->constatus = "connection succesful";
    // pull users events
    $e->eventlist = eventDB2("events", "owner", "%", $conn); //"SELECT * FROM events WHERE owner = '$id'"; look for any events the user owns

}
$encode = json_encode($e); // encodes the JSON object


print_r($encode); // prints the JSON objet to be caught by our clients POST request





?>
