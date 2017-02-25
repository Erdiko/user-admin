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


use erdiko\authenticate\AuthenticationInterface;
use erdiko\users\models\User;

class BasicAuthentication implements AuthenticationInterface
{
	public function login( $credentials )
	{
		$user = new User();
		$username = (array_key_exists('username', $credentials)) ? $credentials['username'] : '';
		$password = (array_key_exists('password',$credentials)) ? $credentials['password'] : '';
		$result = $user->authenticate($username, $password);
		return $result;
	}

	public function verify($credentials)
    {
        // TODO: Implement verify() method.
        return true;
    }
}