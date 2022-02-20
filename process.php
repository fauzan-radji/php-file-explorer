<?php
$response = [];

function getLastElement($arr) {
  return array_pop($arr);
}

if (isset($_GET['path'])) {
  $path = $_GET['path'];
  if (is_file($path)) {
    $textContent = file_get_contents($path);
    
    $response['info'] = "Success";
    $filename = getLastElement(explode('/',$path));
    $response['filename'] = $filename;
    $response['textContent'] = $textContent;
    file_put_contents('./temp.txt', $textContent);

  } else if (is_dir($path)){
    $response['textContent'] = '';
    $children = scandir($path);
    foreach($children as $child) {
      if (!str_ends_with($path, '/')) {
        $path .= '/';
      }
      $fullPath = $path . $child;
      if (is_dir($fullPath)) {
        $response['textContent'] .= '<DIR>   [' . $child . ']';
      } else {
        $response['textContent'] .= '<FILE>  ' . $child;
      }
      $response['textContent'] .= "
";
    }

    $response['info'] = 'The Path is a directory';
  } else {
    $response['error'] = "The file doesn't exist";
  }
}

if (isset($_POST['path'])) {
  $path = $_POST['path'];
  if (is_file($path)) {
    $oldTextContent = file_get_contents($path);
    $newTextContent = $_POST['text-content'];
    if ($oldTextContent === $newTextContent) {
      $response['info'] = 'Nothing changed';
    } else {
      $response['info'] = 'File content updated';
      file_put_contents($path, $newTextContent);
    }
  } else {
    $response['error'] = "The Path isn't a file OR The file doesn't exist";
  }
}

echo json_encode($response);