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
            $res=$req1->fetch();
            if ($res>0){
                $req3=$conn->prepare("SELECT id_operation FROM operation WHERE email=?");
                $req3->execute(array($_GET["email"]));
                $r3=$req3->fetchColumn();
                if (empty($r3)){
                    $op_id=generateID(25);
                    $req2=$conn->prepare("INSERT INTO `operation`(`email`, `id_operation`, `date`) VALUES (?,?,NOW())");
                    $req2->execute(array(
                        $op_id,
                        $_GET["email"]
                     ));
                }else{
                     $op_id=$r3;
                }
                $mail = new PHPMailer();
                $mail->IsSMTP();  // telling the class to use SMTP
                $mail->SMTPDebug = 2;
                $mail->Mailer = "smtp";
                $mail->Host =    "";
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
                $mail->Port = 465;
                $mail->SMTPAuth = true; // turn on SMTP authentication
                $mail->Username = ""; // SMTP username
                $mail->Password = ""; // SMTP password
                $Mail->Priority = 1;
                $mail->AddAddress("raed.boafif@gmail.com","Name");
                $mail->SetFrom("baligh@mymetalsprice.com", "ez");
                $mail->Subject  = "This is a Test Message";
                $mail->Body     = "dsqdsqdsq "; // https://domain.com/account/changePassword/$_GET["email"]/$op_id
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