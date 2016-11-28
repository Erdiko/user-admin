<?php
// boot up Erdiko

// This is for standard installations
$bootstrap = dirname(dirname(dirname(dirname(__DIR__)))).'/app/bootstrap.php';

// This is for erdiko-dev (CI & dev)
if(!file_exists($bootstrap))
	$bootstrap = dirname(dirname(__DIR__)).'code/app/bootstrap.php';

require_once $bootstrap;
