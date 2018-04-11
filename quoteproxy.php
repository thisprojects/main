<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$lon = $request->lon;
$lat = $request->lat;

//echo"lon = $lon and lat = $lat";

$response = file_get_contents("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");


echo $response;



?>
