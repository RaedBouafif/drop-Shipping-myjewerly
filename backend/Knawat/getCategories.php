<?php

namespace Knawat;

include "./MP.php";
include "../infoServer.php";
$mp = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d", []);
$product = $mp->getProducts();
$product = $product->{'products'};
$table = array();
foreach ($product as $key => $value) {
    $categories = $value->{'categories'};
    $n = count($categories);
    $treelvl = array();
    for ($i = 0; $i < $n; $i++) {
        $treelvl[$i] =  $categories[$i]->{'name'}->{'en'};
    }
    $table[$key] = $treelvl;
}
print_r(json_encode($table));