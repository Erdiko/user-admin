<?php
namespace tests\erdiko;

use erdiko\core\datasource\File;

require_once dirname(__DIR__).'/ErdikoTestCase.php';


class FileTest extends \tests\ErdikoTestCase
{
    public $fileObj=null;
    public $webRoot=null;

    /**
     * SetUp
     */
    public function setUp()
    {
        $this->fileObj = new File();
        $this->webRoot = dirname(__DIR__)."/files";
        //echo $this->webRoot;
    }

    // called after the test functions are executed
    // this function is defined in PHPUnit_TestCase and overwritten
    // here
    public function tearDown()
    {
        // delete your instance
        unset($this->fileObj);
    }

    /**
     * Test write and read
     * @todo break into 2 test functions
     */
    public function testWriteAndRead()
    {
        $string = "Sample string";
        $this->fileObj->write($string, "sample.txt");
        $result = $this->fileObj->read("sample.txt");
        $this->assertEquals($string, $result);

        $string2 = "Sample string 2";
        $this->fileObj->write($string2, "sample2.txt", $this->webRoot."/tests");
        $result2 = $this->fileObj->read("sample2.txt", $this->webRoot."/tests");
        $this->assertEquals($string2, $result2);

        $string3 = "Sample string 3";
        $this->fileObj->write($string3, "sample2.txt", $this->webRoot."/tests", "a");
        $result3 = $this->fileObj->read("sample2.txt", $this->webRoot."/tests");
        $this->assertEquals($string2.$string3, $result3);
        $this->assertStringEndsWith($string3, $result3);
    }

    /**
     * @expectedException \Exception
     */
    public function testReadNotExistFile()
    {
        $result4 = $this->fileObj->read("does_not_exist.txt", $this->webRoot."/tests");
    }
    
    /**
     * @depends testWriteAndRead
     */
    public function testMove()
    {
        $contents1 = $this->fileObj->read("sample2.txt", $this->webRoot."/tests");
        $test = $this->fileObj->move("sample2.txt", $this->webRoot."/tests/app", $this->webRoot."/tests");

        $this->assertTrue($test);
        
        // verify move with a file read
        $contents2 = $this->fileObj->read("sample2.txt", $this->webRoot."/tests/app");
        $this->assertEquals($contents1, $contents2);
    }

    /**
     * @depends testMove
     * @expectedException \Exception
     */
    public function testMoveFail()
    {
        // Verify original file is now gone
        $contents = $this->fileObj->read("sample2.txt", $this->webRoot."/tests");
    }

    /**
     * @depends testMove
     */
    public function testCopy()
    {
        $this->assertTrue($this->fileObj->copy("sample.txt", $this->webRoot."/tests"));
        $this->assertTrue($this->fileObj->copy("sample.txt", $this->webRoot."/tests", "sample_copy.txt"));
        $this->assertTrue(
            $this->fileObj->copy(
                "sample.txt",
                $this->webRoot."/tests/app",
                "sample_copy2.txt",
                $this->webRoot."/tests"
            )
        );
    }

    /**
     * @depends testCopy
     */
    public function testRename()
    {
        $this->assertTrue($this->fileObj->rename("sample_copy.txt", "sample4.txt", $this->webRoot."/tests"));
        // @todo verify move with a file read
    }

    /**
     * @depends testRename
     * @todo add tests
     */
    public function testRenameFail()
    {
        $this->assertTrue(TRUE);
    }

    /**
     * @depends testCopy
     */
    public function testFileExists()
    {
        $this->assertTrue($this->fileObj->fileExists("sample.txt"));
        $this->assertTrue($this->fileObj->fileExists("sample.txt", $this->webRoot."/tests"));

        $this->assertFalse($this->fileObj->fileExists("sample_not_exist.txt"));
        $this->assertFalse($this->fileObj->fileExists("does_not_exist.txt", $this->webRoot."/tests/app"));
    }

    /**
     * @depends testFileExists
     */
    public function testDelete()
    {
        $this->assertTrue($this->fileObj->delete("sample.txt"));
        $this->assertTrue($this->fileObj->delete("sample2.txt", 
            $this->webRoot."/tests/app"));
        $this->assertTrue($this->fileObj->delete("sample4.txt", 
            $this->webRoot."/tests"));
        $this->assertTrue($this->fileObj->delete("sample.txt", 
            $this->webRoot."/tests"));
        $this->assertTrue($this->fileObj->delete("sample_copy2.txt", 
            $this->webRoot."/tests/app"));
    }

    /**
     * Try to delete a file that has already been deleted
     * 
     * @depends testDelete
     */
    public function testDeleteFail()
    {
        $this->assertFalse($this->fileObj->delete("sample.txt"));
    }
}
