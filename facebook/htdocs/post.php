<?php

  $postdata = file_get_contents("php://input");
  $request = json_decode($postdata);
  $email = $request->message;

  $encode = json_encode($email);

//  echo json_encode("hello");
  print_r($encode); 
  $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");

  fwrite($myfile, $email);
  fwrite($myfile, $postdata);


  fclose($myfile);



//  $data               = file_get_contents("php://input");
//  $message            = $dataJsonDecode->message;
//  $myJSON = json_encode($message);
//  print_r ($myJSON);

//$json = json_decode(file_get_contents('php://input'), true);
//$output = json_encode($json);

//$egg = json_encode("hello");
//print_r($egg);

?>
