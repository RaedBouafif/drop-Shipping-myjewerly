<?php

namespace Knawat;

include "./MP.php";
include "../infoServer.php";
$mp = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d", []);
$product = $mp->getProducts();
$product = $product->{'products'};
print_r(json_encode($product));
    //print_r(json_encode($x));
    //foreach ($product as $key => $value){
        //print_r($value);
        //print_r($value);
        //echo "----------------------------------------------------------------------------";
        // $sku= $value->{'sku'};
        // $name=$value->{'name'}->{'en'};
        // $description=$value->{'description'}->{'tr'}; //mafamech eng
        // $images=$value->{'images'};
        // array_push($res[$key],$sku,$name,$description,$images);
        // print_r($res);
        // print_r(json_encode($images));
    //}
    //print_r(json_encode($product));