<?php
namespace Knawat;
include './createInstance.php';
if (isset($_GET["page"])){
    $page = $_GET["page"];
    if (!isset($_GET["categorie"])){
        $product = $mp->getProducts(10,$page);
        $product = $product->{'products'};
        print_r(json_encode($product));
    }else{
        $nbr = $mp->countProducts();
        $n = $nbr->{'total'};
        $product = $mp->getProducts($n,$page);
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
                    if ($test1 and $test2){
                        array_push($data,$value);
                        break;
                    }
                }
            }
        }else{
            foreach ($product as $key => $value){
                $categories = $value->{'categories'};
                foreach ($categories as $key1 => $value1){
                    if ($value1->{'name'}->{'en'}===$_GET["categorie"] and $value1->{'treeNodeLevel'}==2){
                        array_push($data,$value);
                        break;
                    }
                }
            }   
        }
    print_r(json_encode($data));
    }
}

?>
