<?php
$response = [];

function getLastElement($arr) {
  return $arr[count($arr) - 1];
}

if (isset($_GET['path'])) {
  $path = $_GET['path'];
  $response['parent'] = dirname($path);

  if (is_file($path)) {
    $textContent = file_get_contents($path);
    
    $response['info'] = "Success";
    $filename = getLastElement(explode('/',$path));
    $response['filename'] = $filename;
    $response['textContent'] = $textContent;
    file_put_contents('./temp.txt', $textContent);

  } else if (is_dir($path)){
    $response['children'] = [];
    $children = scandir($path);
    foreach($children as $child) {
      if (!str_ends_with($path, '/')) {
        $path .= '/';
      }

      if($child == '..') {
        $fullPath = $response['parent'];
      } else {
        $fullPath = $path . $child;
      }
      
      if (is_dir($fullPath)) {
        if($child == '.') continue;

        $type = "directory";
        $extension = "";
      } else {
        $type = "file";
        $extension = pathinfo($child,PATHINFO_EXTENSION);
      }

      $response['children'][] = [
        "name" => $child,
        "type" => $type,
        "extension" => $extension,
        "path" => $fullPath
      ];
    }

    $response['info'] = 'The Path is a directory';
  } else {
    $response['error'] = "The file or folder doesn't exist";
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