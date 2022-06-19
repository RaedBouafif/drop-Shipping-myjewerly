<?php

include "./MP.php";

use Knawat\MP;

$connect = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d");
echo $connect->getAccessToken();