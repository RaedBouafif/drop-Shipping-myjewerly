<?php

namespace Knawat;

include "./MP.php";
include './checkNodeLevel.php';
include "../infoServer.php";
$mp = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d", []);
$n = $mp->countProducts();
$n1 = $n->{'total'};
$product = $mp->getProducts($n1, 1);
$product = $product->{'products'};
$table = array();
foreach ($product as $key => $value) {
    $categories = $value->{'categories'};
    $n = count($categories);
    $treelvl = array();
    for ($i = 0; $i < $n; $i++) {
        if (($categories[$i]->{'treeNodeLevel'} == 2 or $categories[$i]->{'treeNodeLevel'} == 3) and (checkNode($treelvl, $categories[$i]->{'treeNodeLevel'}))) {
            array_push($treelvl, $categories[$i]);
        }
    }
    if (!in_array($treelvl, $table)) {

        array_push($table, $treelvl);
    }
}
$tazo = array();
for ($j = 0; $j < count($table); $j++) {
    $tr = array();
    for ($k = 0; $k < count($table[$j]); $k++) {
        $x = $table[$j][$k]->{'name'}->{'en'};
        array_push($tr, $x);
    }
    array_push($tazo, $tr);
}
print_r(json_encode($tazo));