<?php
namespace tests\erdiko;

use erdiko\core\Controller;

require_once dirname(__DIR__).'/ErdikoTestCase.php';


class ControllerTest extends \tests\ErdikoTestCase
{
    public $controllerObj = null;

    public function setUp()
    {
        $this->controllerObj = new \erdiko\core\Controller;
    }

    public function tearDown()
    {
        unset($this->controllerObj);
    }

    public function testSetThemeName()
    {
        $themeName = 'Test theme name';
        $this->controllerObj->setThemeName($themeName);
        $return = $this->controllerObj->getResponse()->getThemeName();
        
        $this->assertEquals($themeName, $return);
    }

    public function testSetThemeTemplate()
    {
        $template = 'Test theme template';
        $this->controllerObj->setThemeTemplate($template);
        $return = $this->controllerObj->getResponse()->getThemeTemplate();

        $this->assertEquals($template, $return);
    }

    public function testSetResponseKeyValue()
    {
        $key = 'test_key';
        $value = 'Test_Value';
        $this->controllerObj->setResponseKeyValue($key, $value);
        $return = $this->controllerObj->getResponse()->getKeyValue($key);

        $this->assertEquals($value, $return);
    }

    public function testSetPageTitle()
    {
        $title = 'Test_Page_Title';
        $this->controllerObj->setPageTitle($title);
        $pageTitle = $this->controllerObj->getResponse()->getTheme()->getPageTitle();

        $this->assertEquals($title, $pageTitle);
    }


    public function testSetBodyTitle()
    {
        $title = 'Test_Body_Title';
        $this->controllerObj->setBodyTitle($title);
        $bodyTitle = $this->controllerObj->getResponse()->getTheme()->getBodyTitle();

        $this->assertEquals($title, $bodyTitle);
    }

    public function testSetTitle()
    {
        $title = 'Test_Title';
        $this->controllerObj->setTitle($title);

        $pageTitle = $this->controllerObj->getResponse()->getTheme()->getPageTitle();
        $bodyTitle = $this->controllerObj->getResponse()->getTheme()->getBodyTitle();

        $this->assertEquals($title, $pageTitle);
        $this->assertEquals($title, $bodyTitle);
    }

    public function testSetContent()
    {
        $content = 'Test content';
        $this->controllerObj->setContent($content);
        $return = $this->controllerObj->getResponse()->getContent();
        $this->assertEquals($content, $return);
    }

    public function testAppendContent()
    {
        //Set content
        $content = 'Test content';
        $this->controllerObj->setContent($content);
        $return = $this->controllerObj->getResponse()->getContent();
        $this->assertEquals($content, $return);
        
        //Set appended content
        $appContent = 'Test appended content.....';
        $this->controllerObj->appendContent($appContent);
        $return = $this->controllerObj->getResponse()->getContent();
        $this->assertEquals($content.$appContent, $return);
    }

    public function testUrlToActionName()
    {
        //First Test
        $site = 'http://erdiko.com/';
        $return = $this->controllerObj->urlToActionName($site, 'get');
        $this->assertEquals('get'.ucfirst($site), $return);
        
        //Second Test
        $site = 'www.erdiko.com/';
        $return = $this->controllerObj->urlToActionName($site, 'get');
        $this->assertEquals('get'.ucfirst($site), $return);
    }

    public function testAddViewAndGetView()
    {
        $viewName = 'examples/helloworld';

        /**
         *  First Test
         *
         *  Add a view without data
         */
        $view = new \erdiko\core\View($viewName);
        $this->controllerObj->addView($viewName);
        //$return = $this->controllerObj->getResponse()->getContent();
        $return = $this->controllerObj->getView($viewName);
        $this->assertEquals($return, $view->toHtml());

        unset($this->controllerObj);
        $this->controllerObj = new \erdiko\core\Controller;
    
        /**
         *  Second Test
         *
         *  Add a view with data
         */
        $data = 'Test Data';
        $view = new \erdiko\core\View($viewName, $data);
        $this->controllerObj->addView($viewName, $data);
        //$return = $this->controllerObj->getResponse()->getContent();
        $return = $this->controllerObj->getView($viewName, $data);
        $this->assertEquals($view->toHtml(), $return);

        unset($this->controllerObj);
        $this->controllerObj = new \erdiko\core\Controller;

        /**
         *  Third Test
         *
         *  Add a view, and then add another view
         */
        //Add a view
        $view = new \erdiko\core\View('examples/helloworld');
        $this->controllerObj->addView('examples/helloworld');
        $return = $this->controllerObj->getView('examples/helloworld');
        $this->assertEquals($view->toHtml(), $return);
        
        //Add another view
        $data = 'Test Data';
        $view2 = new \erdiko\core\View('examples/carousel', $data);
        $this->controllerObj->addView('examples/carousel', $data);
        $return = $this->controllerObj->getResponse()->getContent();
        $this->assertEquals($view->toHtml().$view2->toHtml(), $return);
        
    }

    public function testGetLayout()
    {
        // First test: Setting a theme object
        $controllerObj = new \erdiko\core\Controller;

        $theme = new \erdiko\core\Theme('bootstrap', null, 'default');
        $controllerObj->getResponse()->setTheme($theme);
        $data = array('body' => "Body content");
        $return = $controllerObj->getLayout('1column', $data);

        // Get content through file_get_contents function
        $themeFolder = $controllerObj->getResponse()->getTheme()->getThemeFolder();
        $fileName = $themeFolder.'/templates/layouts/1column.php';
        $content = file_get_contents($fileName);

        // Search for the keyword which is right before php tag
        $pos = strrpos($content, 'role="main">');
        $content = substr($content, 0, $pos);

        // Check if two content are matched
        $find = strrpos($return, $content);
        $this->assertGreaterThanOrEqual(0, $find);

        unset($controllerObj);
    }


    public function testRedirect()
    {
        //$url = 'http://erdiko.com';
        //$this->controllerObj->redirect($url);

    }
}
