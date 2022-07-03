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
            //print_r(json_encode($res));
            $data=array();
            $data["success"]=false;
             if ($res[0]>0){
                //$data["email"]=$_GET["email"];
                $req3=$conn->prepare("SELECT id_operation FROM operation WHERE email=?");
                $req3->execute(array($_GET["email"]));
                $r3=$req3->fetch();
                if (empty($r3)){
                    $op_id=generateID(25);
                    $req2=$conn->prepare("INSERT INTO `operation`(`email`, `id_operation`, `date`) VALUES (?,?,NOW())");
                    $req2->execute(array(
                        $_GET["email"],
                        $op_id
                     ));
                }else{
                     $op_id=$r3[0];
                }
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
                $mail->AddAddress($_GET["email"]);
                $mail->SetFrom("_mainaccount@myjewery.com", "MyJewery-Reset your password");
                $mail->Subject  = "E-mail verification";
                $mail->Body     = "Hello ".$_GET["email"].", Here is a new link to enter your new password :: https://myjewery.com/account/changePassword/".$_GET['email']."/".$op_id;
                $mail->IsHTML(true); 
                $mail->WordWrap = 50;
                $mail->send();
                $data["success"]=true;
            }
            print_r(json_encode($data));
        }catch (PDOException $e){
             echo "connection failed :". $e->getMessage();
        }
    }
?>