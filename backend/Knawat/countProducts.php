<?php

namespace Knawat;
include './createInstance.php';
$nbr = $mp->countProducts();
$n = $nbr->{'total'};
$result = array();
if (isset($_GET["categorie"])){
    $product = $mp->getProducts($n,1);
    $products = $product->{'products'};
    $n=0;
    if (isset($_GET["categorieChild"])){
        foreach ($products as $key => $value){
            $categories = $value->{'categories'};
            $test1=false;
            $test2=false;
            foreach ($categories as $key1 => $value1){
                if ($value1->{'name'}->{'en'}==$_GET["categorie"] and $value1->{'treeNodeLevel'}==2){
                    $test1 = true;
                }
                if ($value1->{'name'}->{'en'}==$_GET["categorieChild"] and $value1->{'treeNodeLevel'}==3){
                    $test2 = true;
                }
                if ($test1 and $test2){
                    $n=$n+1;
                    break;
                }
            }
        }
    }else{
        foreach ($products as $key => $value){
            $categories = $value->{'categories'};
            foreach ($categories as $key1 => $value1){
                if ($value1->{'name'}->{'en'}==$_GET["categorie"] and $value1->{'treeNodeLevel'}==2){
                    $n=$n+1;
                    break;
                }
            }
        }
    }
}
$nbl = ceil($n / 10);
$result["nbrPage"] = $nbl;
$result["nbrProducts"] = $n;
print_r(json_enode($result));


// ki tebda m3edi filtre bel categories el nbr totale bech yetbadel