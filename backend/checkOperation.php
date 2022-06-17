<?php
    include_once './infoServer.php';
    if (isset($_GET["email"])){
        try{
            $req1=$conn->prepare("SELECT count(*) FROM operation WHERE id_operation=?");
            $req1->execute(array(
                $_GET["operationId"]
            ));
            $res=$req1->fetch();
            $data=array();
            if ($res>0){
                $data["success"]=true;
            }else{
                $data["success"]=false;
            }
        }catch (PDOException $e){
            echo "failed to connect".$e->getMessage();
        }
    }
?>