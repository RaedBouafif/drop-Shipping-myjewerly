<?php
include './infoServer.php';
include './generateId.php';
$data = json_decode(file_get_contents('php://input'));
if (isset($data->{"clid"})){
    $id=$data->{"clid"};
    $first_name=$data->{"first_name"};
    $last_name=$data->{"last_name"};
    $address_1=$data->{"address_1"};
    $address_2="";
    if (isset($data->{"address_2"})){
        $address_2=$data->{"address_2"};
    }
    $city=$data->{"city"};
    $state=$data->{"state"};
    $country=$data->{"country"};
    $email=$data->{"email"};
    $phone=$data->{"phone"};
    $order_note="";     
    if (isset($data->{"order_note"})){
        $order_note=$data->{"order_note"};
    }
    $total=$data->{"total"};
    $products=$data->{"products"};
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
            echo "aaaaaaaaaaaaaaaaaaaaaaaaazezeaze";
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