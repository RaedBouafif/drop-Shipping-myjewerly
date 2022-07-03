<?php
    include_once './infoServer.php';
    if (isset($_POST["email"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $req1=$conn->prepare("SELECT id_account,password FROM account WHERE email=?");
            $req1->execute(array(
                $_POST["email"]
            ));
            $res=$req1->fetchAll(PDO::FETCH_ASSOC);
            $data=array();
            if (empty($res)){
                $data["success"]=false;
            }else{
                $hash = $res[0]["password"];
                if (password_verify($_POST["password"], $hash)) {
                    $data["success"]=true;
                    $data["id"]=$res[0]["id_account"];
                } else {
                    $data["success"]=false;
                }
            }
            print_r(json_encode($data));
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }
?>