<?php
namespace Knawat;
include "./MP.php";
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1",[]);
    // $access_token=$mp->getAccessToken();
    // echo $access_token;
    $product=$mp->getProductBySku("T2EB2845");
    print_r(json_encode($product));
    
 ?>