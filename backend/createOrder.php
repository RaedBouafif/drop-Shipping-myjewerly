<?php
include './infoServer.php';
include './generateId.php';
if (isset($_POST["clid"])){
    $id=$_POST["clid"];
    $first_name=$_POST["first_name"];
    $last_name=$_POST["last_name"];
    $address_1=$_POST["address_1"];
    $address_2="";
    if (isset($_POST["address_2"])){
        $address_2=$_POST["address_2"];
    }
    $city=$_POST["city"];
    $state=$_POST["state"];
    $country=$_POST["country"];
    $email=$_POST["email"];
    $phone=$_POST["phone"];
    $order_note=""; 
    if (isset($_POST["order_note"])){
        $order_note=$_POST["order_note"];
    }
    $total=$_POST["total"];
    $products=$_POST["products"];
    try {
        $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $id_order=generateID(45);
        $stmt = $conn->prepare("INSERT INTO `orders`(`id_order`, `first_name`, `last_name`, `address_1`, `address_2`, `city`, `state`, `country`, `email`, `phone`, `order_note`, `total`, `id_account`, `date`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())");
        $stmt->execute(array(
            $id_order,
            $first_name,
            $last_name,
            $address_1,
            $address_2,
            $city,
            $state,
            $country,
            $email,
            $phone,
            $order_note,
            $total,
            $id
        ));
        foreach ($products as $key => $value){
            $sku= $value->{"id"};
            $img= $value->{"image"};
            $name= $value->{"name"};
            $price= $value->{"price"};
            $quantity= $value->{"quantity"};
            $size="";
            if (isset($value->{"size"})){
                $size=$value->{"size"};
            }
            $color="";
            if (isset($value->{"color"})){
                $color=$value->{"color"};

            }
            $len="";
            if (isset($value->{"len"})){
                $len=$value->{"len"};
            }
            $ringSize="";
            if (isset($value->{"ringSize"})){
                $ringSize=$value->{"ringSize"};
            }
            $stmt1=$conn->prepare("INSERT INTO `products`(`sku`, `image`, `name`, `price`, `quantity`, `size`, `color`, `len`, `ring_size`, `date`, `id_order`) VALUES (?,?,?,?,?,?,?,?,?,NOW(),?)");
            $stmt1->execute(array(
                $sku,
                $img,
                $name,
                $price,
                $quantity,
                $size,
                $color,
                $len,
                $ringSize,
                $id_order
            ));
        }
    }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
    }
}
?>