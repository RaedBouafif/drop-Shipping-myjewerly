<?php
$access = "http://localhost:3000";
header("Access-Control-Allow-Origin:" . $access);
header("Access-Control-Allow-Methods:GET,POST,OPTIONS,PUT,DELETE");
header("Access-Control-Allow-Headers:Content-Disposition,Content-Type,content-Length,Accept-Encoding");
header("Content-type:application/json");
$dbName = "jewelry_db";
$passWord = "";
$userName = "root";
$host = "localhost";