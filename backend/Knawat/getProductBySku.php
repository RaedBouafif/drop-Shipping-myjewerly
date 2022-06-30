<?php

namespace Knawat;

include './createInstance.php';
if (isset($_GET["sku"])) {
    $nbr = $mp->countProducts();
    $n = $nbr->{'total'};
    $products1 = $mp->getProducts($n, 1);
    $products = $products1->{'products'};
    $result = array();
    foreach ($products as $key => $value) {
        if ($value->{"sku"} == $_GET["sku"]) {
            array_push($result, $value);
            break;
        }
    }
    // $result[0]->{'price_sale_scy'}= $result[0]->{'price_sale'};
    for ($i = 0; $i < count($result[0]->{"variations"}); $i++) {
        $result[0]->{'variations'}[$i]->{'sale_price_scy'} = $result[0]->{'variations'}[$i]->{'sale_price'};
    }
    print_r(json_encode($result[0]));
}


//price_sale => nrodou price_sale_scy