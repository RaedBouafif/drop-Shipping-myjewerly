<?php
$access = "http://127.0.0.1:3000";
header("Access-Control-Allow-Origin:" . $access);
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$dbName = "myjewery_db";
$passWord = "raedBaligh";
$userName = "myjewery_Raed";
$host = "myjewery.com";