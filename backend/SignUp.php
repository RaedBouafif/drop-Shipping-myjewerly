<?php
    include_once "./infoServer.php";
    include_once "./generateId.php";
    if (isset($_POST["email"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $id=generateID(25);
            $req1=$conn->prepare("INSERT INTO `account`(`id_account`, `firstname`, `lastname`, `email`, `phone`, `password`, `date_creation`) VALUES (?,?,?,?,?,?,NOW())");
            $req1->execute(array(
                $id,
                $_POST["firstName"],
                $_POST["lastName"],
                $_POST["email"],
                $_POST["tel"],
                password_hash($_POST["password"], PASSWORD_DEFAULT)
            ));
            $tab= array();
            $tab["id"]=$id;
            print_r(json_encode($tab));
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }
?>