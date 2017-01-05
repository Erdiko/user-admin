<?php


/**
 * Front
 *
 * erdiko_auth / FrontController
 *
 * @category    app
 * @package     app\controllers
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      Leo Daidone, leo@arroyolabs.com
 */


namespace app\controllers;


use erdiko\authenticate\BasicAuth;
use erdiko\authenticate\iErdikoUser;
use erdiko\authorize\Authorizer;
use erdiko\users\models\User;

class Front extends \erdiko\core\Controller
{
	protected function checkAuth($action,$resource)
	{
		try {
			$userModel  = new User();
			$auth       = new BasicAuth($userModel);
			$user       = $auth->current_user();
			if($user instanceof iErdikoUser){
				$authorizer = new Authorizer( $user );
				$result     = $authorizer->can( $action, $resource );
			} else {
				$result = false;
			}
		} catch (\Exception $e) {
			var_dump($e->getMessage());
			$result = false;
		}
		return $result;
	}

	public function get($var = null)
	{
		if (!empty($var)) {
			if ($this->checkAuth("read",$var)) {
				// load action based off of naming conventions
				return $this->_autoaction($var, 'get');
			} else {
				return $this->getNoAuth();
			}
		} else {
			return $this->getIndex();
		}
	}

	public function post($var = null)
	{
		if (!empty($var)) {
			$action = ($var=='login') ? 'login' : 'write';
			if ($this->checkAuth($action, $var)) {
				// load action based off of naming conventions
				return $this->_autoaction($var, 'post');
			} else {
				return $this->getNoAuth();
			}
		} else {
			return $this->getIndex();
		}
	}

	public function getIndex()
	{
        $this->setTitle('Welcome to Erdiko Auth Module');
        $this->setThemeTemplate("fullpage");
		$this->addView('admin/dashboard');
	}

	public function getPlans()
	{
		$this->setTitle('Welcome to Erdiko');
		$this->addView('admin/plans');
	}

	public function getSubscriptions()
	{
		$this->setTitle('Welcome to Erdiko');
		$this->addView('admin/subscriptions');
	}

	public function getUsers()
	{
		$this->setTitle('Welcome to Erdiko');
		$this->addView('admin/users/users');
	}

	public function getDashboard()
	{
		$auth = new BasicAuth(new User());
        $this->setTitle('Welcome to Erdiko Auth Module');
        $this->setThemeTemplate("fullpage");
		$this->addView('admin/dashboard',array('user'=>$auth->current_user()));
	}

	public function getNoAuth()
	{
		// Add page data
		$this->setTitle('Welcome to Erdiko');
		$this->addView('admin/no_auth');
	}
}
