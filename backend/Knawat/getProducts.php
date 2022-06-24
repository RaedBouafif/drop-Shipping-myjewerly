<?php
namespace Knawat;
include "./MP.php";
include "../infoServer.php";
$mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1", []);
if (!isset($_GET["categorie"])){
    $page = $_GET["page"];
    $product = $mp->getProducts(10,$page);
    $product = $product->{'products'};
    print_r(json_encode($product));
}else{
    $nbr = $mp->countProducts();
    $n = $nbr->{'total'};
    $product = $mp->getProducts($n,1);
    $product = $product->{'products'};
    $data=array();
    // $cat = $product[0]->{'categories'};
    // print_r(json_encode($cat));
    if (isset($_GET["categorieChild"])){
        foreach ($product as $key => $value){
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
            }
            if ($test1 and $test2){
                array_push($data,$value);
            }
        }
    }else{
        foreach ($product as $key => $value){
            $categories = $value->{'categories'};
            $test3=false;
            foreach ($categories as $key1 => $value1){
                if ($value1->{'name'}->{'en'}===$_GET["categorie"] and $value1->{'treeNodeLevel'}==2){
                    $test3 = true;
                }
            }
            if ($test3==true){
                array_push($data,$value);
            }
        }   
    }
print_r(json_encode($data));
}



/*
    if (!isset(cate))
    elseif (is)
*/
?>


