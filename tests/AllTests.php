<?php
/**
 * Erdiko Authorize Test Suite
 * Be sure to name your test cases MyClassTest.php 
 * where MyClass is the functionality being tested
 */
namespace tests;

class AllTests
{
    public static function suite()
    {
        $suite = new \PHPUnit_Framework_TestSuite('ErdikoTests');
        $testFiles = AllTests::_getTestFiles();

        foreach ($testFiles as $file) {
            $suite->addTestFile($file);
        }

        return $suite;
    }

    private static function _getTestFiles()
    {
        $folders = glob('./phpunit/*');
        $tests = glob('./phpunit/*Test.php'); // Get top level tests

        foreach($folders as $folder) {
            $newTests = glob("{$folder}/*Test.php");
            $tests = array_merge($tests, $newTests);
        }

        return $tests;
    }
}
