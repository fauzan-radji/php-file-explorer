<?php

include('./file.php');

$path = $_GET['path'];
sendFile($path);