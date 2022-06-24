<?php
    namespace Knawat;
    include "./MP.php";
    include "../infoServer.php";
    $mp = new MP("c51f3640-ec3d-11ec-af24-c72977665b54", "9daeb100-a95b-4022-952d-2a663847dab1", []);
    $nbr = $mp->countProducts();
    $n = $nbr->{'total'};
    $nbl = ceil($n/10);
    print_r(json_encode($nbl));


// ki tebda m3edi filtre bel categories el nbr totale bech yetbadel
?>