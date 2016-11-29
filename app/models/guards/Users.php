<?php


/**
 * Users
 *
 * erdiko_auth / Users
 *
 * @category    app
 * @package     app\models\guards
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      Leo Daidone, leo@arroyolabs.com
 */


namespace app\models\guards;


use AC\Kalinka\Guard\BaseGuard;

class Users extends BaseGuard
{
	public function getActions()
	{
		return ["read", "write"];
	}
}