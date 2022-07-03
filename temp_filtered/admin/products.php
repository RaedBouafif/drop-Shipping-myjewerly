<?php
include './info.php';
if (isset($_GET["id_order"])){
    try{
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt=$conn->prepare("SELECT `id_product`, `sku`, `name`, `price`, `quantity`, `size`, `color`, `len`, `ring_size` FROM `products` WHERE id_order=?");
        $stmt->execute(array(
            $_GET["id_order"]
        ));
        $data=$stmt->fetchAll(PDO::FETCH_ASSOC);
        print_r(json_encode($data));
    }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
    }
}

?>