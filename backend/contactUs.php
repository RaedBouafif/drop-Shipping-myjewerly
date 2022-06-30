<?php
include './infoServer.php';
    if (isset($_POST["email"])){
        $email = $_POST["email"];
        $message = $_POST["message"];
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt=$conn->prepare("INSERT INTO `contact`(`email`, `message`, `date`) VALUES (?,?,NOW())");
            $stmt->execute(array(
                $email,
                $message
            ));
        }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
        }
    }
?>