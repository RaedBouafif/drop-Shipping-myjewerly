<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

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
$mail->AddAddress("raed.boafif@gmail.com","Name");
$mail->SetFrom("_mainaccount@myjewery.com", "ez");
$mail->Subject  = "This is a Test Message";
$mail->Body     = "dsqdsqazeazdsq";
$mail->WordWrap = 50;
if(!$mail->Send()) {
echo 'Message was not sent.';
echo 'Mailer error: ' . $mail->ErrorInfo;
} else {
echo 'Message has been sent.';
}

?>