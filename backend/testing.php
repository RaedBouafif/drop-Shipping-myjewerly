<?php
    include './infoServer.php';
    try{
          $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $req1=$conn->prepare("SELECT count(*) FROM account ");
            $req1->execute();
            $x=$req1->fetch();
            print_r(json_encode($x[0]));
            
    }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
?>