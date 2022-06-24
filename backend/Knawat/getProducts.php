<?php
namespace Knawat;
include "./MP.php";
include "../infoServer.php";
if (isset($_GET["page"])){
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1", []);
    $page = $_GET["page"];
    $product = $mp->getProducts(10,$page);
    $product = $product->{'products'};
    print_r(json_encode($product));
}

/*
    if (!isset(cate))
    elseif (is)
*/
?>


