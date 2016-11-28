<?php
/**
 * Erdiko Helper
 *
 * Some global helpers
 *
 * @category    Erdiko
 * @package     Core
 * @copyright   Copyright (c) 2016, Arroyo Labs, www.arroyolabs.com
 * @author      John Arroyo, john@arroyolabs.com
 */
namespace erdiko\core;


class Helper
{
    /**
     * Log Object
     */
    protected static $_logObject=null; // @todo get rid of this

    /**
     * Load a view from the current theme with the given data
     *
     * @param string $viewName
     * @param array $data
     */
    public static function getView($viewName, $data = null, $templateRootFolder = null)
    {
        $view = new \erdiko\core\View($viewName, $data);

        if ($templateRootFolder !== null) {
            $view->setTemplateRootFolder($templateRootFolder);
        }
        return  $view->toHtml();
    }
    
    /**
     * Read JSON config file and return array
     *
     * @param string $file
     * @return array $config
     */
    public static function getConfigFile($filename)
    {
        $filename = addslashes($filename);
        if (is_file($filename)) {
            $data = str_replace("\\", "\\\\", file_get_contents($filename));
            $json = json_decode($data, true);

            if (empty($json)) {
                throw new \Exception("Config file has a json parse error, $filename");
            }

        } else {
            throw new \Exception("Config file not found, $filename");
        }
        
        return $json;
    }
    
    /**
     * Get configuration
     */
    public static function getConfig($name = 'application', $context = null)
    {
        if($context == null)
            $context = getenv('ERDIKO_CONTEXT');

        $filename = ERDIKO_APP."/config/{$context}/{$name}.json";
        return self::getConfigFile($filename);
    }
    
    /**
     * Get the compiled application routes from the config files
     *
     * @todo cache the loaded/compiled routes
     */
    public static function getRoutes($context = null)
    {
        if($context == null)
            $context = getenv('ERDIKO_CONTEXT');
        $file = ERDIKO_APP."/config/{$context}/routes.json";
        $applicationConfig = self::getConfigFile($file);
        
        return $applicationConfig['routes'];
    }
    
    /**
     * Send email
     * @todo add ways to swap out ways of sending
     */
    public static function sendEmail($toEmail, $subject, $body, $fromEmail)
    {
        $headers = "From: $fromEmail\r\n" .
            "Reply-To: $fromEmail\r\n" .
            "X-Mailer: PHP/" . phpversion();
        
        return mail($toEmail, $subject, $body, $headers);
    }
    
    /**
     * log message to log file
     * If you enter null for level it will default to 'debug'
     *
     * @usage \Erdiko::log('debug',"Message here...", array())
     *
     * @param string $level
     * @param string $message
     * @param array $context
     * @return bool $success
     */
    public static function log($level, $message, array $context = array())
    {
        if(self::$_logObject==null)
        {
            $erdikoContext = getenv('ERDIKO_CONTEXT');
            $config = self::getConfig("application", $erdikoContext);
            $logFiles = $config["logs"]["files"][0];
            $logDir = $config["logs"]["path"];

            self::$_logObject = new \erdiko\core\Logger($logFiles, $logDir);
        }

        if(empty($level))
            $level = \Psr\Log\LogLevel::DEBUG; // Default to debug for convenience

        return self::$_logObject->log($level, $message, $context);
    }
    
    /**
     * Get the configured cache instance using name
     *
     * @return cache $cache returns the instance of the cache type
     */
    public static function getCache($cacheType = "default")
    {
        $context = getenv('ERDIKO_CONTEXT');
        $config = self::getConfig("application");
        
        if (isset($config["cache"][$cacheType])) {
            $cacheConfig = $config["cache"][$cacheType];
            $class = "erdiko\core\cache\\".$cacheConfig["type"];
            return new $class;
        } else {
            return false;
        }
    }
}
