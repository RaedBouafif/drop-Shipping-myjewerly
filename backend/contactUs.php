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
            $res = $stmt->rowCount();
            if ($res>0){
                $mail = new PHPMailer();
                $mail->IsSMTP();  // telling the class to use SMTP
                $mail->SMTPDebug = 2;
                $mail->Mailer = "smtp";
                $mail->Host ="myjewery.com";
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
                $mail->Port = 465;
                $mail->SMTPAuth = true; // turn on SMTP authentication
                $mail->Username = "_mainaccount@myjewery.com"; // SMTP username
                $mail->Password = "Mlkdps54#@@5"; // SMTP password
                $mail->AddAddress("hazemalmasri@hotmail.com");
                $mail->SetFrom("_mainaccount@myjewery.com", "MyJewery-Email Contact: ");
                $mail->Subject  = "E-mail sent from <strong> ".$email."</strong>";
                $mail->Body     = "Hello,  <p>".$message."</p>";
                $mail->IsHTML(true); 
                $mail->WordWrap = 50;
                if(!$mail->Send()) {
                    echo 'Message was not sent.';
                    echo 'Mailer error: ' . $mail->ErrorInfo;
                } else {
                    echo 'Message has been sent.';
                }
            }
        }catch (PDOException $e){
        echo "connection failed :". $e->getMessage();
        }
    }
?>