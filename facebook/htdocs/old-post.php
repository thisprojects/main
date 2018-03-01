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

$sql = "INSERT INTO users (firstname, lastname, idnumber) VALUES ('$firstname', '$lastname', '$id')"; // create variable to hold user DB SQL query
$checkuser ="SELECT * FROM users WHERE firstname = '$firstname' AND lastname = '$lastname' AND idnumber = '$id'"; // variable that checks if a user with the current name and facebook ID number exists

$searchresult = $conn->query($checkuser); // query user DB with the checkuser variable info

if ($searchresult->num_rows > 0){ // if any rows in the user table have matching entries

    // set basic user info in our JSON object
    $e->firstname = $firstname;
    $e->lastname = $request->lastname;
    $e->exists = "already exists"; // JSON info to let the client know the user already exists

    // pull users events
    $e->eventlist = eventDB2("events", "owner", "%", $conn); //"SELECT * FROM events WHERE owner = '$id'"; look for any events the user owns
    //look for any event comments
    $e->comments = eventDB2("comments", "owner", "%", $conn);
    // look for any subscribed events
    $subbedEvents = eventDB2("subscriptions", "owner", $id, $conn); //  "SELECT * FROM subscriptions WHERE owner ='$id'"; look for any events the user is subscribed to
    $e->sublist = crossRef($subbedEvents, $conn); //cross reference subscriptions table with events table to resolve which events user is subsribed to
    //look for any event comments







}else { // if the user doesnt exist we create a user

if ($conn->query($sql) === TRUE) {
    $e->exists = "Record Created";
} else {
    $e->error = " Error: " . $sql . " " . $conn->error;
}
}
}
$encode = json_encode($e); // encodes the JSON object


print_r($encode); // prints the JSON objet to be caught by our clients POST request





?>
