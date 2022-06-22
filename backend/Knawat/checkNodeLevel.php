<?php
function checkNode(array $tab,int $level){
    $test = 1;
    for ( $i=0 ; $i < count($tab) ; $i++){
        if ( $tab[$i]->{'treeNodeLevel'}==$level){
            return  0;
        }
    }
    return $test;
}
?>