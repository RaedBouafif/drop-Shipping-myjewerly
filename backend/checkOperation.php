<?php
   
    include_once './infoServer.php';
    if (isset($_GET["operationId"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $req1=$conn->prepare("SELECT count(*) FROM operation WHERE id_operation=?");
            $req1->execute(array(
                $_GET["operationId"]
            ));
            $res=$req1->fetch();
            $data=array();
            $data["success"]=false;
            if ($res[0]>0){
                $data["success"]=true;
            }
            print_r(json_encode($data));
        }catch (PDOException $e){
            echo "failed to connect".$e->getMessage();
        }
    }
?>