<?php 
    namespace Knawat;
    include './MP.php';
    include './checkNodeLevel.php';
    if (isset($_GET["sku"])){
        $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1",[]);
        $prod_sku = $mp->getProductBySku($_GET["sku"]);
        $cat = $prod_sku->{'categories'};
        $n = count($prod_sku->{'categories'}); //4
        $tab = array();
        for ( $i=0 ; $i <$n ; $i++){
            if (($cat[$i]->{'treeNodeLevel'}==2 or $cat[$i]->{'treeNodeLevel'}==3) and (checkNode($tab,$cat[$i]->{'treeNodeLevel'})==1)){
                array_push($tab,$cat[$i]);
            }
        }
        $prod_sku->{'categories'}=$tab;
        if ($prod_sku->{'categories'}[0]->{'treeNodeLevel'} > $prod_sku->{'categories'}[1]->{'treeNodeLevel'}){
            $temp = $prod_sku->{'categories'}[0];
            $prod_sku->{'categories'}[0] = $prod_sku->{'categories'}[1];
            $prod_sku->{'categories'}[1] = $temp;
        }
        print_r(json_encode($prod_sku));
    }
?>  