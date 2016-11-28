<?php
/**
 * Test Erdiko cache (filesystem cache)
 */
namespace tests\erdiko;

use erdiko\core\Cache;

require_once dirname(__DIR__).'/ErdikoTestCase.php';


class CacheTest extends \tests\ErdikoTestCase
{

    public function setUp()
    {
        Cache::clear();
    }

    public function tearDown()
    {
        Cache::clear();
    }

    public function testGetCacheObject()
    {
        $defaultObj = Cache::getCacheObject();
        Cache::clear();

        /**
         * Precondition
         * Check if there is nothing
         */
        $key = 'test_cache_key';
        $data = 'Test Cache Data';
        $return = $defaultObj->has($key);
        $this->assertFalse($return);

        // Add some data
        $defaultObj->put($key, $data);

        // Check if the data exists
        $return = $defaultObj->has($key);
        $this->assertTrue($return);

        // Validate returned data
        $return = $defaultObj->get($key);
        $this->assertEquals($data, $return);
    }

    /**
     * @depends testGetCacheObject
     */
    public function testHas()
    {
        Cache::clear();

        /**
         * Precondition
         * Check if there is nothing
         */
        $key = 'test_has_key';
        $data = 'Test Has Data';
        $return = Cache::has($key);
        $this->assertFalse($return);

        // Add a data
        Cache::put($key, $data);

        // Check if the data exists
        $return = Cache::has($key);
        $this->assertTrue($return);

        // Validate returned data
        $return = Cache::get($key);
        $this->assertEquals($data, $return);
    }

    /**
     * @depends testHas
     */
    public function testPutAndGet()
    {
        $key = 'string_test';

        /**
         *  Precondition
         *  Check if there is nothing
         */
        $return = Cache::has($key);
        $this->assertFalse($return);

        /**
         * String Test
         * Pass a string data to cache
         */
        $value = "test value";
        Cache::put($key, $value);
        $return = Cache::get($key);
        $this->assertEquals($value, $return);

        /**
         * Array Test
         * Pass an array data to cache
         */
        $value = array(
                'test_1' => 'test 1',
                'test_2' => 'test 2'
                );
        Cache::put($key, $value);
        $return = Cache::get($key);
        $this->assertEquals($value, $return);

        /**
         * JSON Test
         * Pass a JSON data to cache
         */
        $json = json_encode($value);
        Cache::put($key, $json);
        $return = Cache::get($key);
        $this->assertEquals($json, $return);

        // Test decoded json
        $arr = json_decode($return, TRUE);
        $this->assertEquals($value, $arr);
        $this->assertEquals($value['test_1'], $arr['test_1']);
        $this->assertEquals($value['test_2'], $arr['test_2']);

        /**
         * Null Test
         * Pass null to cache
         */
        $key = 'null_test';
        Cache::put($key, null);
        $return= Cache::get($key);
        $this->assertEquals(null, $return);

        /**
         * Oject Test
         * Pass a Object to cache
         * Custom class won't work
         */
        $key = 'object_test';
        $obj = new \stdClass();
        $obj->var1 = 'Test var one';
        $obj->var2 = 'Test var two';
        
        Cache::put($key, $obj);
        $return = (Object)Cache::get($key);

        $this->assertEquals($obj, $return);
        $this->assertEquals($obj->var1, $return->var1);
        $this->assertEquals($obj->var2, $return->var2);
    }
    
    /**
     * @depends testPutAndGet
     */
    public function testDelete()
    {
        /**
         * Precondition
         * Check if there is nothing
         */
        $key = 'test_key';
        $data = 'Test Data';
        $return = Cache::has($key);
        $this->assertFalse($return);

        //Add a data
        Cache::put($key, $data);

        //Check if the data exists
        $return = Cache::has($key);
        $this->assertTrue($return);

        /**
         * Remove the data
         */
        Cache::delete($key);
        
        //Check if the data being removed
        $return = Cache::has($key);
        $this->assertFalse($return);
    }
    
    /**
     * @depends testDelete
     */
    public function testClear()
    {
        /**
         * Insert two data sets
         */

        // First Data
        $key = 'test_key_1';
        $data = 'Test Data 1';
        Cache::put($key, $data);
        $return = Cache::get($key);
        $this->assertEquals($return, $data);

        /**
         * Validate the data
         */
        $return = Cache::has($key);
        $this->assertTrue($return);

        // Second Data
        $key2 = 'test_key_2';
        $data2 = 'Test Data 2';
        Cache::put($key2, $data2);
        $return = Cache::get($key2);
        $this->assertEquals($data2, $return);

        /**
         * Validate the data
         */
        $return = Cache::has($key);
        $this->assertTrue($return);

        /**
         * Remove all data
         */
        Cache::clear();

        //Check if all data are removed
        $return = Cache::has($key);
        $this->assertFalse($return);
        $return = Cache::has($key2);
        $this->assertFalse($return);
    }
}
