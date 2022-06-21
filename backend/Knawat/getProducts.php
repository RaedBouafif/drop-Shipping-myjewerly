<?php
namespace Knawat;
include "./MP.php";
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1",[]);
    $product=$mp->getProducts();
    $product=$product->{'products'};
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
 ?>