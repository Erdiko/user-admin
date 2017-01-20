<?php

use erdiko\core\AjaxResponse;
require_once dirname(__DIR__).'/ErdikoTestCase.php';


class AjaxResponseTest extends \tests\ErdikoTestCase
{
    var $ajaxResponseObj = null;

    function setUp()
    {
        $this->ajaxResponseObj = new \erdiko\core\AjaxResponse;
    }

    function tearDown() 
    {
        unset($this->ajaxResponseObj);
    }

    function testRender()
    {
        $hello = "Hello World";
        $tempData = array(
            "status" => 200,
            "body" => $hello,
            "errors" => false
        );
        $tempData = json_encode($tempData);

        $this->ajaxResponseObj->setContent($hello);
        $return = $this->ajaxResponseObj->render();
        
        $this->assertEquals($tempData, $return);
    }

    /**
     * @runInSeparateProcess
     */
    function testSend()
    {
        $hello = "Hello World";
        $tempData = array(
            "status" => 200,
            "body" => $hello,
            "errors" => false
        );
        $tempData = json_encode($tempData);

        $this->ajaxResponseObj->setContent($hello);

        // call send and buffer its output
        ob_start();
        $this->ajaxResponseObj->send();
        $return = ob_get_clean();
        ob_end_clean();

        $this->assertEquals($tempData, $return);
    }

    function testRenderWithError()
    {
        $this->ajaxResponseObj->setStatusCode(500);
        $this->ajaxResponseObj->setErrors("true");

        $tempData = array(
            "status" => 500,
            "body" => null,
            "errors" => array("true")
        );
        $tempData = json_encode($tempData);
        $return = $this->ajaxResponseObj->render();
        $this->assertEquals($tempData, $return);
    }
}