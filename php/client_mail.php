<?php
  require_once('../extentions/PHPMailer/src/PHPMailer.php');
  require_once('../extentions/PHPMailer/src/SMTP.php');
  require_once('../extentions/PHPMailer/src/Exception.php');
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;
  /* ---------------------------------------------------------------------------------------------------------*/
  //Client Mails
  $total = $_POST['clientTotal'];
  $dataResume = json_decode($_POST['infoJson'],true);
  $bodyClient = '<h1><b>Moving Resume:</b></h1> <br>';
  foreach ($dataResume as $category=>$subCats) {
    $bodyClient .= '<h3>'.$category.'</h3><br><table style="width:100%">';
    foreach ($subCats as $subCat=>$quantity) {
      $bodyClient .= '<tr><td style="width:50%">'.$subCat.'</td><td style="width:50%">'.$quantity.'</td></tr>';
    }
    $bodyClient .= '</table><br>';
  }
  $bodyClient .= '<br><br><b>Total Amount: '.$total.'</b>';
  $clientEmail = new PHPMailer();
  //Tell PHPMailer to use SMTP
  $clientEmail->isSMTP();
  //Enable SMTP debugging
  // SMTP::DEBUG_OFF = off (for production use)
  // SMTP::DEBUG_CLIENT = client messages
  // SMTP::DEBUG_SERVER = client and server messages
  $clientEmail->SMTPDebug = SMTP::DEBUG_OFF;
  $clientEmail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );
  //Set the hostname of the mail server
  $clientEmail->Host = gethostbyname('smtp.gmail.com');
  // use
  // $clientEmail->Host = gethostbyname('smtp.gmail.com');
  // if your network does not support SMTP over IPv6

  //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
  $clientEmail->Port = 587;

  //Set the encryption mechanism to use - STARTTLS or SMTPS
  $clientEmail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

  //Whether to use SMTP authentication
  $clientEmail->SMTPAuth = true;

  //Username to use for SMTP authentication - use full email address for gmail
  $clientEmail->Username = 'sunsetmovingsolutions@gmail.com';

  //Password to use for SMTP authentication
  $clientEmail->Password = 'ljjrbklwozekwldu';
  $clientEmail->SetFrom('sunsetmovingsolutions@gmail.com', 'Sunset Cotizator'); //Name is optional
  //Set an alternative reply-to address
  $clientEmail->addReplyTo('info@sunsetmovingsolutions.com', 'Sunset Information');
  $clientEmail->Subject   = 'Cotization resume';
  $clientEmail->IsHTML(true);
  $clientEmail->Body = $bodyClient;
  $clientEmail->AltBody = $bodyClient;
  $clientEmail->AddAddress($_POST['clientEmail']);
  $clientEmail->Send();
?>