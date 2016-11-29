<?php


/**
 * Plans
 *
 * erdiko_auth / Plans
 *
 * @category    app
 * @package     app\models\guards
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      Leo Daidone, leo@arroyolabs.com
 */


namespace app\models\guards;


use AC\Kalinka\Guard\BaseGuard;

class Plans extends BaseGuard
{
	public function getActions()
	{
		return ["read", "write"];
	}
}