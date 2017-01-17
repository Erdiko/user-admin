<?php
// boot up Erdiko

// This is for standard installations
$bootstrap = dirname(dirname(dirname(dirname(__DIR__)))).'/app/bootstrap.php';

// This is for Docker (works within docker and Travis CI)
if(!file_exists($bootstrap))
	$bootstrap = '/code/app/bootstrap.php';

require_once $bootstrap;
