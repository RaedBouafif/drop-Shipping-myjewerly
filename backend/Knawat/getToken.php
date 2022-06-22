<?php
namespace Knawat;
include "./MP.php";
    $mp = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d");
    $access_token=$mp->getAccessToken();
    echo $access_token;
    //$x=$mp->getProductBySku("SITSTE0003-4716");
    //print_r($x);