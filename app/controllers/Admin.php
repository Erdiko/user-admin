<?php
/**
 * Examples Controller
 * Multiple examples of how you can use erdiko.  It includes some simple use cases.
 *
 * @category    app
 * @package     controllers
 * @copyright   Copyright (c) 2016, Arroyo Labs, www.arroyolabs.com
 * @author      John Arroyo, john@arroyolabs.com
 */
namespace app\controllers;


/**
 * User Admin Controller Class
 */
class Admin extends \erdiko\core\Controller
{

    /**
     * ALWAYS redirect the user back to the index.
     *
     */
	public function get($var = null)
    {
        return $this->getIndex();
	}

    /**
     * Serve the index route, leave the rest to the angular app
     *
     */
	public function getIndex()
	{
        $this->setTitle('Erdiko User Admin');
        $this->setThemeTemplate("fullpage");
		$this->addView('admin/dashboard');
	}

}
