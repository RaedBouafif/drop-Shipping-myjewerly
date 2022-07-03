<?php
namespace Knawat;
include "./MP.php";
include "../infoServer.php";
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1", []);
    $product = $mp->getProducts(2,1);
    $product = $product->{'products'};
    $data = array();
    $zab="Watches, Parts & Accessories";
    $s=0;
    $i=0;
    foreach ($product as $key => $value){
        // print_r(json_encode($value));
        // echo "--------------------------------------------------------------";
        $s=$s+$i;
        $i=0;
        $cat = $value->{'categories'};
        foreach ($cat as $key1 => $value1){
            // print_r($value1->{'name'});
            if ($value1->{'name'}->{'en'}==$zab and $value1->{'treeNodeLevel'}==2){
                $i=$i+1;
            }
        }
        echo $i."------------------------";
    }
    echo $s;
    // print_r(json_encode($data));

?>