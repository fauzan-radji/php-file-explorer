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

// Zip file and send it to the browser
function zip($root, $zipname) {
  $zip = new ZipArchive();
  $zip->open($zipname, ZipArchive::CREATE);
  $files = getFiles($root);
  foreach($files as $file) {
    if (is_file($file)) {
      $zip->addFile($file);
    }
  }
  $zip->close();
  return $zipname;
}

// get all files recursively
function getFiles($dir, &$results = array()) {
  $files = scandir($dir);

  foreach ($files as $key => $value) {
      $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
      if (is_file($path)) {
          $results[] = $path;
      } else if ($value != "." && $value != "..") {
          getFiles($path, $results);
          $results[] = $path;
      }
  }

  return $results;
}

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


sendFile(zip('d:\photoshop','test.zip'));