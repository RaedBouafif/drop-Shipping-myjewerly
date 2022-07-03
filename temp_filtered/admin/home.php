<?php
include './info.php';
try{
    $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt1=$conn->prepare("SELECT count(*) FROM account");
    $stmt1->execute();
    $res1=$stmt1->fetchColumn();   
    $stmt2=$conn->prepare("SELECT count(*) FROM products");
    $stmt2->execute();
    $res2=$stmt2->fetchColumn();
    $stmt3=$conn->prepare("SELECT first_name AS First_Name, last_name AS Last_Name, address_1 AS Address_1, address_2 AS Address_2, city AS City, state AS State, country AS Country, email AS Email_Address, phone AS Phone, order_note AS Order_Notes, total AS Total FROM orders");
    $stmt3->execute();
    $res3=$stmt3->fetchAll(PDO::FETCH_ASSOC);
    $data=array();
    $data["nombreClient"]=$res1;
    $data["nombreSales"]=$res2;
    array_push($data,$res3);
    $data["oreders"]=$data[0];
    unset($data[0]);
    print_r($data);
}catch (PDOException $e){
    echo "connection failed :". $e->getMessage();
}
