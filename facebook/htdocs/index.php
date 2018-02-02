<?php

require_once('TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "892773288002375686-Q4KcfKdtyDUbnCzX9b5dvcKyhpsrjka",
    'oauth_access_token_secret' => "XNuNJbvKv6JtVLnCCXGMpYXVzHMf15ERknylptciliSI2",
    'consumer_key' => "FznubNB2YxcRB92bOQHDROqHo",
    'consumer_secret' => "cIOgHfFeJVbFeA9irO7LPwPa7aMn9dkp12ik9dRGLDPwoqy6Jw"
);
 
$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
 
$requestMethod = "GET";
 
$getfield = '?screen_name=iagdotme&count=20';
 
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>