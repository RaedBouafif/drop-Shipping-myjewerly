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
                $_POST["phone"],
                password_hash("1234567", PASSWORD_DEFAULT)
            ));
            print_r(json_encode($id));
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }
?>