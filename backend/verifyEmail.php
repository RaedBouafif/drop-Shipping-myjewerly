<?php 
    include_once './infoServer.php';
    include_once './generateId.php';
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require '../vendor/phpmailer/phpmailer/src/Exception.php';
    require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require '../vendor/phpmailer/phpmailer/src/SMTP.php';
   if (isset($_GET["email"])){
        try{
            $conn = new PDO("mysql:host=".$host.";dbname=".$dbName, $userName, $passWord);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $req1=$conn->prepare("SELECT count(*) FROM account WHERE email=?");
            $req1->execute(array(
                $_GET["email"]
            ));
            $res1=$req1->fetchColumn();
            $data=array();
            $id=generateID(6);
            if ($res1 == 0){
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
                $mail->AddAddress($_GET["email"],);
                $mail->SetFrom("_mainaccount@myjewery.com", "MyJewery-Account Verification E-mail");
                $mail->Subject  = "E-mail verification";
                $mail->Body     = "Hello, Here is your email ID verification <html><body><strong>".$id."</strong></body></html>";
                $mail->IsHTML(true); 
                $mail->WordWrap = 50;
                if(!$mail->Send()) {
                echo 'Message was not sent.';
                echo 'Mailer error: ' . $mail->ErrorInfo;
                } else {
                echo 'Message has been sent.';
                }
                $data["code"]=$id;
                $data["emailExist"]=false;
                print_r(json_encode($data));
            }else {
                $data["emailExist"]=true;
                print_r(json_encode($data));
            }
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }

?>