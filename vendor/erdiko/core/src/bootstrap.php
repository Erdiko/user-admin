<?php
define('ERDIKO_PUBLIC', ERDIKO_ROOT.'/public');
define('ERDIKO_APP', ERDIKO_ROOT.'/app');
define('ERDIKO_VAR', ERDIKO_ROOT.'/var');
define('ERDIKO_VIEWS', ERDIKO_APP.'/views/');

// Composer
require_once ERDIKO_VENDOR.'/autoload.php';

// Core
require_once ERDIKO_SRC.'/Toro.php';
require_once ERDIKO_SRC.'/autoload.php'; // auto loading for the app

// Core framework functions (static functions)
require_once ERDIKO_ROOT.'/Erdiko.php';

$config = \Erdiko::getConfig();
$debug = $config['site']['debug'];
putenv("ERDIKO_DEBUG=".$debug);

// Set a default context if none specified
if(empty(getenv('ERDIKO_CONTEXT')))
	putenv("ERDIKO_CONTEXT=default");