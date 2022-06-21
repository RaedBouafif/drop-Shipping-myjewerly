<?php
    namespace Knawat;
    include "./MP.php";
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1",[]);
    $product=$mp->getProducts();
    $product=$product->{'products'};
    $table=array();
    foreach ($product as $key => $value){
        $categories = $value->{'categories'};
        $n = count($categories);
        $treelvl = array();
        for ( $i=0; $i < $n ; $i++){
            $treelvl[$i] =  $categories[$i]->{'name'}->{'en'};
        }
        $table[$key]=$treelvl;
    }
    print_r(json_encode($table));
?>