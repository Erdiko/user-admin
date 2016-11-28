<?php
/**
 * Register framework autoload function
 *
 * @category    Erdiko
 * @package     Core
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      John Arroyo, john@arroyolabs.com
 */

ini_set('include_path', ini_get('include_path') . PATH_SEPARATOR . ERDIKO_ROOT .
    PATH_SEPARATOR . ERDIKO_VENDOR . PATH_SEPARATOR . ERDIKO_APP . PATH_SEPARATOR . ERDIKO_SRC);


spl_autoload_register(function ($name) {

    // error_log("autoload: $name");

    if (strpos($name, '\\') !== false) {
        $path = str_replace('\\', '/', $name);
        $class = basename($path);
        $dir = '/'.dirname($path);
        $filename = ERDIKO_ROOT.$dir.'/'.$class.'.php';
        // error_log("file: $filename");

        if (is_file($filename)) {
            require_once $filename;
            return;
        }
    }
});
