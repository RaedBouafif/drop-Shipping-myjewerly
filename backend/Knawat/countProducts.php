<?php

namespace Knawat;

include "./MP.php";
include "../infoServer.php";
$mp = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d", []);
$nbr = $mp->countProducts();
$n = $nbr->{'total'};
$nbl = ceil($n / 10);
$result = array();
$result["nbrPage"] = $nbl;
$result["nbrProducts"] = $n;
print_r(json_encode($result));


// ki tebda m3edi filtre bel categories el nbr totale bech yetbadel