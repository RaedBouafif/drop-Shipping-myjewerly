<?php
namespace Knawat;
include './createInstance.php';
if (isset($_GET["page"])){
    $page = $_GET["page"];
    if (!isset($_GET["id"])){
        $product = $mp->getProducts(10,$page);
        $products = $product->{'products'};
        print_r(json_encode($products));
    }else{
        $nbr = $mp->countProducts();
        $n = $nbr->{'total'};
        $product = $mp->getProducts($n,1);
        $products = $product->{'products'};
        $data=array();
        // $cat = $product[0]->{'categories'};
        // print_r(json_encode($cat));
        if (isset($_GET["idChild"])){
            foreach ($products as $key => $value){
                $categories = $value->{'categories'};
                foreach ($categories as $key1 => $value1){
                    if ($value1->{'id'}==$_GET["idChild"] and $value1->{'parentId'}==$_GET["id"]){
                        array_push($data,$value);
                        break;
                    }
                }
            }
        }else{
            foreach ($products as $key => $value){
                $categories = $value->{'categories'};
                foreach ($categories as $key1 => $value1){
                    if ($value1->{'id'}==$_GET["id"]){
                        array_push($data,$value);
                        break;
                    }
                }
            }   
        }
        if (count($data) >10){
            $tabl = array();
            switch ($page){
                case 1: for ($i=0 ; $i<10 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 2: for ($i=10 ; $i<20 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 3: for ($i=20 ; $i<30 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 4: for ($i=30 ; $i<40 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 5: for ($i=40 ; $i<50 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 6: for ($i=50 ; $i<60 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 7: for ($i=60 ; $i<70 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 8: for ($i=70 ; $i<80 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 9: for ($i=80 ; $i<90 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 10: for ($i=90 ; $i<100 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 11: for ($i=100 ; $i<110 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 12: for ($i=110 ; $i<120 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 13: for ($i=120 ; $i<130 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
                case 14: for ($i=130 ; $i<140 ;$i++){
                    if (!empty($data[$i])){
                        array_push($tabl,$data[$i]);
                    }else{
                        break;
                    }
                }break;
            }
            print_r(json_encode($tabl));
        }else{
            print_r(json_encode($data));
        }
    }
}

//version le9dima bel esm
// if (isset($_GET["page"])){
//     $page = $_GET["page"];
//     if (!isset($_GET["categorie"])){
//         $product = $mp->getProducts(10,$page);
//         $products = $product->{'products'};
//         print_r(json_encode($products));
//     }else{
//         $nbr = $mp->countProducts();
//         $n = $nbr->{'total'};
//         $product = $mp->getProducts($n,1);
//         $products = $product->{'products'};
//         $data=array();
//         // $cat = $product[0]->{'categories'};
//         // print_r(json_encode($cat));
//         if (isset($_GET["categorieChild"])){
//             foreach ($products as $key => $value){
//                 $categories = $value->{'categories'};
//                 $test1=false;
//                 $test2=false;
//                 foreach ($categories as $key1 => $value1){
//                     if ($value1->{'name'}->{'en'}==$_GET["categorie"] and $value1->{'treeNodeLevel'}==2){
//                         $test1 = true;
//                     }
//                     if ($value1->{'name'}->{'en'}==$_GET["categorieChild"] and $value1->{'treeNodeLevel'}==3){
//                         $test2 = true;
//                     }
//                     if ($test1 and $test2){
//                         array_push($data,$value);
//                         break;
//                     }
//                 }
//             }
//         }else{
//             foreach ($products as $key => $value){
//                 $categories = $value->{'categories'};
//                 foreach ($categories as $key1 => $value1){
//                     if ($value1->{'name'}->{'en'}===$_GET["categorie"] and $value1->{'treeNodeLevel'}==2){
//                         array_push($data,$value);
//                         break;
//                     }
//                 }
//             }   
//         }
//         if (count($data) >10){
//             $tabl = array();
//             switch ($page){
//                 case 1: for ($i=0 ; $i<10 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 2: for ($i=10 ; $i<20 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 3: for ($i=20 ; $i<30 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 4: for ($i=30 ; $i<40 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 5: for ($i=40 ; $i<50 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 6: for ($i=50 ; $i<60 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 7: for ($i=60 ; $i<70 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 8: for ($i=70 ; $i<80 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 9: for ($i=80 ; $i<90 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 10: for ($i=90 ; $i<100 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 11: for ($i=100 ; $i<110 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 12: for ($i=110 ; $i<120 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 13: for ($i=120 ; $i<130 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//                 case 14: for ($i=130 ; $i<140 ;$i++){
//                     if (!empty($data[$i])){
//                         array_push($tabl,$data[$i]);
//                     }else{
//                         break;
//                     }
//                 }break;
//             }
//             print_r(json_encode($tabl));
//         }else{
//             print_r(json_encode($data[0]->{'categories'}));
//         }
//     }
// }

?>
