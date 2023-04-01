<?php
  $preruta = date('Y-m-d_his');
  $preruta = (string)$preruta;
  $ruta= '../snapshots/'.$preruta.'_cotizacion.jpeg';
  $data = $_REQUEST['base64data'];
  $image = explode(',',$data);
  file_put_contents($ruta, base64_decode($image[1]));
  echo $ruta
?>