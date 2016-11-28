<?php
/**
 * Example of how to set up a unit test
 * Test the functionality of the Erdiko framework static methods
 */
namespace tests\erdiko;

use erdiko\core\Logger;
use erdiko\core\Helper;

require_once dirname(__DIR__).'/ErdikoTestCase.php';

class HelperTest extends \tests\ErdikoTestCase
{
    public function testGetConfigFile()
    {
        /**
         *  First Test
         */
        //Get the config file through getConfigFile function
        $filename = ERDIKO_APP."/config/default/application.json";
        $return = Helper::getConfigFile($filename);

        //Get the config file through file_get_contents function
        $content = file_get_contents($filename);
        $content = str_replace("\\", "\\\\", $content);
        $content = json_decode($content, true);

        //Validate the config file
        $this->assertEquals($return, $content);
    }

    /**
     * @expectedException \Exception
     */
    public function testGetConfigFileException()
    {
        /**
         *  Second Test
         *
         *  Passing a non-exist config file
         */
        $fileName = ERDIKO_APP.'/config/'."non-exist.json";
        $return = Helper::getConfigFile($fileName);
    }

    public function testConfig()
    {
        /**
         *  First Test
         */
        $filename = "application";        
        $this->assertTrue(Helper::getConfig($filename) != false);
    }

    /**
     * @expectedException \Exception
     */
    public function testConfigException()
    {
        /**
         *  Second Test
         *
         *  Passing a non-exist config file
         */
        $fileName = "application/non-exist";
        Helper::getConfig($fileName);
    }

    public function testSlendEmail()
    {
        Helper::sendEmail("To@arroyolabs.com", "Test Heading", "Test Body", "From@arroyolabs.com");
    }

    public function testGetRoutes()
    {
        //Get routes through getRoutes function
        $return = Helper::getRoutes();

        //Get routes through direct access
        $filename =  ERDIKO_APP.'/config/default/routes.json';
        $data = str_replace("\\", "\\\\", file_get_contents($filename));
        $json = json_decode($data, true);
        
        //Validate data
        $this->assertEquals($return, $json['routes']);
    }

    public function testLogs()
    {
        //Initialize a File object locally
        $fileObj = new \erdiko\core\datasource\File;
        $logFolder = \ERDIKO_ROOT."/var/logs";

        $sampleText="info: This is a sample log for Erdiko class test";
        
        /**
         * Log a regular message
         */
        Helper::log(\Psr\Log\LogLevel::INFO, $sampleText);
        $return= $fileObj->read("system.log", $logFolder);
        $this->assertTrue(strpos($return, $sampleText) !== false);

        /**
         * Log a exception message
         */
        $sampleText="error: This is a sample EXCEPTION log for Erdiko class test";
        Helper::log(\Psr\Log\LogLevel::ERROR, $sampleText);
        $return= $fileObj->read("system.log", $logFolder);
        $this->assertTrue(strpos($return, $sampleText) !== false);

        //Clean up
        $fileObj->delete("system.log", $logFolder);
        $fileObj->delete("exception.log", $logFolder);
    }

    public function getCache()
    {
        //Reture false if config file is not existed
        $this->assertTrue(Helper::getCache("default"));
    }
}
