<?php
    namespace Knawat;
    include "./MP.php";
    include './checkNodeLevel.php';
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1",[]);
    $product=$mp->getProducts();
    $product=$product->{'products'};
    $table=array();
    foreach ($product as $key => $value){
        $categories = $value->{'categories'};
        $n = count($categories);
        $treelvl = array();
        for ( $i=0; $i < $n ; $i++){
            if (($categories[$i]->{'treeNodeLevel'}==2 or $categories[$i]->{'treeNodeLevel'}==3) and (checkNode($treelvl,$categories[$i]->{'treeNodeLevel'}))){
                array_push($treelvl,$categories[$i]);
            }
        }
        if  (!in_array($treelvl,$table)){

            array_push($table,$treelvl);
        }   
    }
    $tazo = array();
    for ( $j=0 ; $j < count($table) ; $j++){
        $tr = array();
        for ( $k=0 ; $k < count ($table[$j]) ; $k++){
            $x= $table[$j][$k]->{'name'}->{'en'};
            array_push($tr,$x);
        }
        array_push($tazo,$tr);
    }
    print_r(json_encode($tazo));

?>