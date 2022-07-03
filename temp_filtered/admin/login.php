<?php
    include './info.php';
    if (isset($_POST["username"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT count(*) FROM admin WHERE username=? AND password=?");
            $stmt->execute(array(
                $_POST["username"],
                $_POST["password"]
            ));
            $res = $stmt->fetch();
            $data = array();
            $data["success"]=false;
            if ($res[0]>0){
                $data["success"]=true;
            }
            print_r(json_encode($data));
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }


?>