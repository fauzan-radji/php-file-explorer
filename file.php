<?php

// function sendFile($filepath) {
//   header('Content-Description: File Transfer');
//   header('Content-Type: application/octet-stream');
//   header('Content-Disposition: attachment; filename='.basename($filepath));
//   header('Content-Transfer-Encoding: binary');
//   header('Expires: 0');
//   header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
//   header('Pragma: public');
//   header('Content-Length: '.filesize($filepath));

//   ob_clean();
//   flush();
//   readfile($filepath);
//   exit;
// }

function sendFile($filepath) {
  // Get file type and set it as Content Type
  $finfo = finfo_open(FILEINFO_MIME_TYPE);
  header('Content-Type: '.finfo_file($finfo, $filepath));
  finfo_close($finfo);

  // Use Content-Disposition: attachment to specify the filename
  header('Content-Disposition: attachment; filename='.basename($filepath));

  // No cache
  header('Expires: 0');
  header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
  header('Pragma: public');

  // Define file size
  header('Content-Length: '.filesize($filepath));

  ob_clean();
  flush();
  readfile($filepath);
  exit;
}