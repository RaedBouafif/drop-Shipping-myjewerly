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
            $res1=$req1->fetch();
            $data=array();
            $data["emailExist"]=true;
            $id=generateID(6);
            if ($res1[0] == 0){
                $mail = new PHPMailer();
                $mail->IsSMTP();  // telling the class to use SMTP
                $mail->SMTPDebug = 0;
                $mail->Mailer = "smtp";
                $mail->Host ="smtp.gmail.com";
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
                $mail->Port = 465;
                $mail->SMTPAuth = true; // turn on SMTP authentication
                $mail->Username = "raed.bouaafif@gmail.com"; // SMTP username
                $mail->Password = "rwuvgtpzbqatoshw"; // SMTP password
                $mail->AddAddress($_GET["email"],"Name");
                $mail->SetFrom("raed.bouaafif@gmail.com","MyJewery-Account Verification E-mail");
                $mail->Subject  = "E-mail verification";
                $mail->Body     = "Hello, Here is your email ID verification <html><body><strong>".$id."</strong></body></html>";
                $mail->IsHTML(true); 
                $mail->WordWrap = 50;
                $mail->send();
                $data["code"]=$id;
                $data["emailExist"]=false;
            }
            print_r(json_encode($data));
        }catch (PDOException $e){
            echo "connection failed :". $e->getMessage();
        }
    }

?>