<?php
  require_once('../extentions/PHPMailer/src/PHPMailer.php');
  require_once('../extentions/PHPMailer/src/SMTP.php');
  require_once('../extentions/PHPMailer/src/Exception.php');
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;
  /*-------------------------------------------------------------------------------------------------*/
  //writting database
  $host="localhost";
  $db="id11152989_totalsebasg";
  $user="id11152989_admtotal";
  $pass="BdApp54388345!";


  $walthr_date = explode('-', $_POST["walthr_datephp"]);
  $walthr_date = $walthr_date[2].'-'.$walthr_date[0].'-'.$walthr_date[1];
  $mov_date = explode('-', $_POST["mov_datephp"]);
  $mov_date = $mov_date[2].'-'.$mov_date[0].'-'.$mov_date[1];
  $cstm_name = $_POST["cstm_namephp"];
  $cntct = $_POST["cntctphp"];
  $phn = $_POST["phnphp"];
  $fx = $_POST["fxphp"];
  $ml = $_POST["mlphp"];
  $old_adrss = $_POST["old_adrssphp"];
  $old_ct = $_POST["old_ctphp"];
  $old_st = $_POST["old_stphp"];
  $old_zpcd = $_POST["old_zpcdphp"];
  $nw_adrss = $_POST["nw_adrssphp"];
  $nw_ct = $_POST["nw_ctphp"];
  $nw_st = $_POST["nw_stphp"];
  $nwz_pcd = $_POST["nwz_pcdphp"];
  $ml_ls = $_POST["ml_lsphp"];
  $id = $_POST["idphp"];
  $img_url = $_POST["snapUrl"];

  $body = 'Date: '.$walthr_date.'<br>Moving Date: '.$mov_date.' <br> Customer Name: '.$cstm_name.'<br> Contact: '.$cntct.'<br> Phone: '.$phn.'<br> Alternative Phone: '.$fx.'<br> Mail: '.$ml.'<br> Old Address: '.$old_adrss.'<br> Old Street: '.$old_st.'<br> Old City: '.$old_ct.'<br> Old Zip Code: '.$old_zpcd.'<br> New Address: '.$nw_adrss.'<br> New Street: '.$nw_st.'<br> New City: '.$nw_ct.'<br> New Zip Code: '.$nwz_pcd;

  $conn=mysqli_connect($host, $user, $pass, $db);

  if (!$conn){
    die ("Error al conectar".mysqli_connect_error());
  }else{
    
  }

  $SQL = "INSERT INTO info_user (wlktrgh_dt, mvng_dt, name, contact, phone, fax, mail,  old_adress, old_city, old_st, old_zipcode,  new_adress, new_city, new_st, new_zipcode, mail_ls, ID, img_url) values ('$walthr_date', '$mov_date', '$cstm_name', '$cntct', '$phn', '$fx', '$ml', '$old_adrss', '$old_ct', '$old_st', '$old_zpcd', '$nw_adrss', '$nw_ct', '$nw_st', '$nwz_pcd', '$ml_ls', '$id', '$img_url')";

  if (mysqli_query($conn,$SQL)){
    echo "Producto guardado éxitosamente";
  }else{
    echo "error".$SQL."<br>".mysqli_error($conn);
  }
  mysqli_close($conn);
  /* ---------------------------------------------------------------------------------------------------------*/
  //Provider Mails
  $providerEmail = new PHPMailer();
  //Tell PHPMailer to use SMTP
  $providerEmail->isSMTP();
  //Enable SMTP debugging
  // SMTP::DEBUG_OFF = off (for production use)
  // SMTP::DEBUG_CLIENT = client messages
  // SMTP::DEBUG_SERVER = client and server messages
  $providerEmail->SMTPDebug = SMTP::DEBUG_OFF;
  $providerEmail->SMTPOptions = array(
                    'ssl' => array(
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                        'allow_self_signed' => true
                    )
                );
  //Set the hostname of the mail server
  $providerEmail->Host = gethostbyname('smtp.gmail.com');
  // use
  // $providerEmail->Host = gethostbyname('smtp.gmail.com');
  // if your network does not support SMTP over IPv6

  //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
  $providerEmail->Port = 587;

  //Set the encryption mechanism to use - STARTTLS or SMTPS
  $providerEmail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

  //Whether to use SMTP authentication
  $providerEmail->SMTPAuth = true;

  //Username to use for SMTP authentication - use full email address for gmail
  $providerEmail->Username = 'sunsetmovingsolutions@gmail.com';

  //Password to use for SMTP authentication
  $providerEmail->Password = 'ljjrbklwozekwldu';
  $providerEmail->SetFrom('sunsetmovingsolutions@gmail.com', 'Sunset Cotizator'); //Name is optional
  $providerEmail->Subject   = 'Cotization resume';
  $providerEmail->IsHTML(true);
  $providerEmail->Body = $body;
  $providerEmail->AltBody = $body;
  $providerEmail->AddAddress( 'sebasgarzons88@gmail.com' );

  $file_to_attach = $img_url;

  $providerEmail->AddAttachment( $file_to_attach , 'Cotization.jpeg' );
  $providerEmail->Send();
?>