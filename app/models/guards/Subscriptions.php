<?php


/**
 * Subscriptions
 *
 * erdiko_auth / Subscriptions
 *
 * @category    app
 * @package     app\models\guards
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      Leo Daidone, leo@arroyolabs.com
 */


namespace app\models\guards;


use AC\Kalinka\Guard\BaseGuard;

class Subscriptions extends BaseGuard
{
	public function getActions()
	{
		return ["read", "write"];
	}

	protected function policyAdmin($subject)
	{
		return $subject->isAdmin();
	}

	public function policyIsOwner($subject, $object)
	{
		return ($subject->id == $object->getUserId());
	}
}