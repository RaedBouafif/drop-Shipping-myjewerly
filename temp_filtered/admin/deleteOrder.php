<?php
include './info.php';
if (isset($_GET["id_order"])){
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt=$conn->prepare("DELETE FROM `orders` WHERE id_order=?");
        $stmt->execute(array(
            $_GET["id_order"]
        ));
        $res = $stmt->rowCount();
        $data = array();
        $data["success"]=false;
        if ($res>0){
            $data["success"]=true;
        }
        printf(json_encode($data));
    }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
    }
    
}



?>