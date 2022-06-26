<?php
namespace Knawat;
include './createInstance.php';
include './checkNodeLevel.php';
if (isset($_GET["sku"])) {
    $prod_sku = $mp->getProductBySku($_GET["sku"]);
    $cat = $prod_sku->{'categories'};
    $n = count($prod_sku->{'categories'}); //4
    $tab = array();
    for ($i = 0; $i < $n; $i++) {
        if (($cat[$i]->{'treeNodeLevel'} == 2 or $cat[$i]->{'treeNodeLevel'} == 3) and (checkNode($tab, $cat[$i]->{'treeNodeLevel'}) == 1)) {
            array_push($tab, $cat[$i]);
        }
    }
    $prod_sku->{'categories'} = $tab;
    if ($prod_sku->{'categories'}[0]->{'treeNodeLevel'} > $prod_sku->{'categories'}[1]->{'treeNodeLevel'}) {
        $temp = $prod_sku->{'categories'}[0];
        $prod_sku->{'categories'}[0] = $prod_sku->{'categories'}[1];
        $prod_sku->{'categories'}[1] = $temp;
    }
    print_r(json_encode($prod_sku));
}