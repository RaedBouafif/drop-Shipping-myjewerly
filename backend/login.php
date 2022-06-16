<?php
    include_once './infoServer.php';
    if (isset($_GET["email"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $req1=$conn->prepare("SELECT id_account FROM account WHERE email=?");
            $req1->execute(array(
                $_GET["email"]
            ));
            $res=$req1->fetchColumn();
            $data=array();
            if (empty($res)){
                $data["success"]=false;
            }else{
                $data["success"]=true;
                $data["id"]=$res;
            }
            print_r(json_encode($data));
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }
?>