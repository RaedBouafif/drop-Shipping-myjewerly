<?php
    include './infoServer.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require '../vendor/phpmailer/phpmailer/src/Exception.php';
    require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require '../vendor/phpmailer/phpmailer/src/SMTP.php';
    if (isset($_POST["email"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $email = $_POST["email"];
            $message = $_POST["message"];
            $stmt=$conn->prepare("INSERT INTO `contact`(`email`, `message`, `date`) VALUES (?,?,NOW())");
            $stmt->execute(array(
                $email,
                $message
            ));
            $mail = new PHPMailer();
            $mail->IsSMTP();  // telling the class to use SMTP
            $mail->SMTPDebug = 0;
            $mail->Mailer = "smtp";
            $mail->Host ="myjewery.com";
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
            $mail->Port = 465;
            $mail->SMTPAuth = true; // turn on SMTP authentication
            $mail->Username = "_mainaccount@myjewery.com"; // SMTP username
            $mail->Password = "Mlkdps54#@@5"; // SMTP password
            $mail->AddAddress("hazemalmasri@hotmail.com");
            $mail->SetFrom("_mainaccount@myjewery.com", "MyJewery-Email Contact: ");
            $mail->Subject  = "E-mail sent from ".$email;
            $mail->Body= "Hello ,  <p>".$message."</p>";
            $mail->IsHTML(true); 
            $mail->WordWrap = 50;
            $mail->send();
            $data = array(); 
            $data["success"]=true;
            print_r(json_encode($data));
        }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
        }
    }
?>