<?php


/**
 * AuthTest
 *
 *
 * @category    app
 * @package     app\service
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      Leo Daidone, leo@arroyolabs.com
 */


namespace app\service;


use erdiko\authenticate\Services\iAuth;
use erdiko\users\models\User;

class AuthTest implements iAuth
{

	public function login( $credentials ) {
		$user = new User();
		$result = $user->authenticate($credentials['username'], $credentials['password']);
		return $result;
	}
}