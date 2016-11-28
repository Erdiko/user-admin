<?php
namespace tests\erdiko;

use erdiko\core\Response;

require_once dirname(__DIR__).'/ErdikoTestCase.php';


class ResponseTest extends \tests\ErdikoTestCase
{
    public $ResponseObj=null;

    public function setUp()
    {
        $this->ResponseObj = new Response;
    }

    public function tearDown()
    {
        unset($this->ResponseObj);
    }

    /**
     * @expectedException
     */
    public function testSetDataValueAndGetDataValue()
    {
        /**
         * First test
         *
         * Set a key and then get the key
         */
        $key = 'Test_Key';
        $data = 'Test_Data';
        $this->ResponseObj->setKeyValue($key, $data);
        $return = $this->ResponseObj->getKeyValue($key);
        $this->assertEquals($data, $return);

        /**
         * Second test
         *
         * Try to get a non exist key
         */
        $key = 'Test_Non_Exist_Key';
        //$return = $this->ResponseObj->getDataValue($key);
        //var_dump($return);

        //$this->assertTrue($return == $data);
    }

    public function testSetTheme()
    {
        $theme = 'theme';
        $this->ResponseObj->setTheme($theme);
        $return = $this->ResponseObj->getTheme();
        $this->assertEquals($theme, $return);
    }

    public function testSetThemeTemplate()
    {
        $themeTemplate = 'themeTemplate';
        $this->ResponseObj->setThemeTemplate($themeTemplate);
        $return = $this->ResponseObj->getThemeTemplate();
        $this->assertEquals($themeTemplate, $return);
    }

    public function testSetContent()
    {
        $content = 'Test content';
        $this->ResponseObj->setContent($content);
        $return = $this->ResponseObj->getContent();
        $this->assertEquals($content, $return);
    }

    public function testAppendContent()
    {
        $content = 'Test content';
        $this->ResponseObj->setContent($content);
        $return = $this->ResponseObj->getContent();
        $this->assertEquals($content, $return);

        $appContent = 'Second test content';
        $this->ResponseObj->appendContent($appContent);
        $return = $this->ResponseObj->getContent();
        $this->assertEquals($content.$appContent, $return);
    }

    public function testRender()
    {
        /**
         *  Test the first condition in render()
         */
        $ResponseObj = new Response;

        //Set a theme object
        $theme = new \erdiko\core\Theme('bootstrap', null, 'default');
        $ResponseObj->setTheme($theme);
        //Get the theme object and check if they are the same object
        $return = $ResponseObj->getTheme();
        $this->assertEquals($theme, $return);

        //Add content
        $content = 'Test content';
        $ResponseObj->setContent($content);
        //Get content and validate the content
        $return = $ResponseObj->getContent();
        $this->assertEquals($content, $return);

        //Perform the render function
        $return = $ResponseObj->render();
        
        
        /**
         *  Validate the content
         */
        $themeFolder = $ResponseObj->getTheme()->getThemeFolder();
        
        //Header
        $header = file_get_contents($themeFolder.'/templates/page/header.html');
        $pos = strrpos($header, 'navbar-header');
        $header = substr($header, 0, $pos);
        $find = strrpos($return, $header);
        $this->assertTrue($find != false);

        //moustache content now was already rendered
        $pos = strrpos($return, '{{theme.defaults.home_url}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{site.name}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{# menu.main }}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{title}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{/ menu.main }}');
        $this->assertFalse($pos);

        //Footer
        $footer = file_get_contents($themeFolder.'/templates/page/footer.html');
        $pos = strrpos($footer, 'Back to top');
        $footer = substr($footer, 0, $pos);
        $find = strrpos($return, $footer);
        $this->assertTrue($find != false);

        //moustache content now was already rendered
        $pos = strrpos($return, '{{# menu.footer}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{/ menu.footer}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{title}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{site.full_name}}');
        $this->assertFalse($pos);
        $pos = strrpos($return, '{{site.copyright}}');
        $this->assertFalse($pos);

        //Content
        $find = strrpos($return, $content);
        $this->assertTrue($find != false);

        unset($ResponseObj);
    }

    public function testSend()
    {
        
    }
}
