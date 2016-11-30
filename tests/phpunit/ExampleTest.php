<?php
/**
 * Add unit tests here...
 */
namespace tests\phpunit;

require_once dirname(__DIR__) . '/ErdikoTestCase.php';


class ExampleTest extends \tests\ErdikoTestCase
{

	public function setUp()
	{

	}

	public function tearDown()
	{

	}

	public function testSomething()
	{
		$this->assertTrue(TRUE);
		$this->assertFalse(FALSE);
	}
}
