<?php
include_once "./infoServer.php";
if (isset($_POST["email"])){
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt=$conn->prepare("UPDATE account SET password=? WHERE email=?");
        $stmt->execute(array(
            password_hash($_POST["password"], PASSWORD_DEFAULT),
            $_POST["email"]
        ));
        $res=$stmt->rowCount();
        $data=array();
        $data["success"]=false;
        if ($res>0){
            $stmt2=$conn->prepare("DELETE FROM operation WHERE email=?");
            $stmt2->execute(array(
                $_POST["email"]
            ));
            $data["success"]=true;
        }
        print_r(json_encode($data));
    }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
    }
}
?>