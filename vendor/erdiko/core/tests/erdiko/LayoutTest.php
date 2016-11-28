<?php
/**
 * Layout tests
 * 
 * @todo these tests need to be cleaned up and add better test coverage
 * @note all Layout class functions should be tested
 */
namespace tests\erdiko;

use erdiko\core\Layout;

require_once dirname(__DIR__).'/ErdikoTestCase.php';


class LayoutTest extends \tests\ErdikoTestCase
{
    public $LayoutObj = null;

    public function setUp()
    {
        $this->LayoutObj = new \erdiko\core\Layout;
    }

    public function tearDown()
    {
        unset($this->LayoutObj);
    }

    public function testGetTemplateFile()
    {
        /**
         * First test
         * Get the html through getTemplateFile function
         */
        $this->LayoutObj->setThemeName('bootstrap');
        $content = 'Test content';
        $this->LayoutObj->setRegion('body', $content);
        $templateName = ERDIKO_APP.'/'.'themes/'.$this->LayoutObj->getThemeName().'/templates/layouts/1column';
        $return = $this->LayoutObj->getTemplateFile($templateName, 
            $this->LayoutObj->getRegions());

        // Get contents of the template through file_get_contents function
        $content = file_get_contents(
            ERDIKO_APP.'/'.'themes/'.$this->LayoutObj->getThemeName().'/templates/layouts/1column.php'
        );
        // Search for the key word, which is right before php tag
        $pos = strrpos($content, 'role="main"');
        // Perform a substring action, check if two content are matched
        $content = substr($content, 0, $pos);
        $find = strrpos($return, $content);
        $this->assertGreaterThanOrEqual(0, $find);

        /**
         * Second test
         * Get a different template file
         */
        $this->LayoutObj->setThemeName('bootstrap');
        $content1 = 'Test content 1';
        $content2 = 'Test content 2';
        $this->LayoutObj->setRegion('one', $content1);
        $this->LayoutObj->setRegion('two', $content2);
        $templateName = ERDIKO_APP.'/'.'themes/'.$this->LayoutObj->getThemeName().'/templates/layouts/2column';
        $return = $this->LayoutObj->getTemplateFile($templateName, 
            $this->LayoutObj->getRegions());

        //Get contents of the template through file_get_contents function
        $content = file_get_contents(
            ERDIKO_APP.'/'.'themes/'.$this->LayoutObj->getThemeName().'/templates/layouts/1column.php'
        );
        //Search for the key word, which is right before php tag
        $pos = strrpos($content, 'role="main"');
        //Perform a substring action
        $content = substr($content, 0, $pos);
        //Check if two content are matched
        $find = strrpos($return, $content);
        $this->assertGreaterThanOrEqual(0, $find);
    }

    /**
     * @expectedException Exception
     */
    public function testGetTemplateFileException()
    {
        /**
         * Third test
         *
         * Try to open a non exist template file
         */
        $this->LayoutObj->setThemeName('bootstrap');
        $content = 'Test content';
        $this->LayoutObj->setRegion('one', $content);
        $data = null;
        $templateName = ERDIKO_APP.'/'.'themes/'.$this->LayoutObj->getThemeName().'/templates/layouts/not_exist';
        $return = $this->LayoutObj->getTemplateFile($templateName, $data);
    }

    public function testSetThemeNameAndGetTheme()
    {
        /**
         * First test
         *
         * Pass a string to setThemeName function
         */
        $theme = "Test Theme";
        $this->LayoutObj->setThemeName($theme);
        $return = $this->LayoutObj->getThemeName();
        $this->assertEquals($return, $theme);

        /**
         * Second test
         *
         * Pass a theme object to setTheme function
         */
        //The setTheme does not accept theme object
        /*
        $ThemeObj = new \erdiko\core\Theme;
        $this->LayoutObj->setTheme($ThemeObj);
        $return = $this->LayoutObj->getTheme();
        $this->assertEquals($return, $ThemeObj);
        */
    }

    public function testSetRegionAndGetRegion()
    {
        $content = 'Test content of region one';
        $this->LayoutObj->setRegion('one', $content);
        $return = $this->LayoutObj->getRegion('one');

        $this->assertEquals($return, $content);
    }

    public function testSetRegions()
    {
        $arr = array(
                'one' => 'region one',
                'two' => 'region two'
                );
        $this->LayoutObj->setRegions($arr);
        $return = $this->LayoutObj->getRegions();
        
        $this->assertEquals($return, $arr);
    }
}
