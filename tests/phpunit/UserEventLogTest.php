<?php

namespace tests\phpunit;

require_once dirname(__DIR__) . '/ErdikoTestCase.php';

use erdiko\users\models\User;
use erdiko\users\models\user\event\Log;
use \tests\ErdikoTestCase;
use \erdiko\authenticate\services\JWTAuthenticator;

class UserEventLogTest extends ErdikoTestCase
{
    protected $logModel;
    protected $logEntity;
    protected $logData;
    protected $loginData;
    protected $user;
    protected $userModel;
    protected $userCreated;
    protected $validCredentials = [
        'username' => 'erdiko.super@arroyolabs.com',
        'password' => 'master_password'
    ];

    public function setup()
    {
        $this->initDummySession();
        $this->initModels();
        $this->initBasicLoginData();
    }

    public function testEventLogin()
    {
        $this->assertTrue($this->loginAction());
        $this->assertLogEvent(Log::EVENT_LOGIN);
    }

    public function testEventAttemptValidUser()
    {
        $this->assertFalse($this->loginAction(false));
        $this->assertLogEvent(Log::EVENT_ATTEMPT);
    }

    public function testEventAttemptInvalidUser()
    {
        $this->assertFalse($this->loginAction(false, false));
        $this->assertLogEvent(Log::EVENT_ATTEMPT);
    }

    public function testEventCreate()
    {
        $this->loginAction();
        $this->createUser();
        $this->assertLogEvent(Log::EVENT_CREATE);
    }

    public function testEventUpdate()
    {
        $this->loginAction();
        $this->updateUser();
        $this->assertLogEvent(Log::EVENT_UPDATE);
    }

    public function testEventChangePassword()
    {
        $this->loginAction();
        $this->changePassword();
        $this->assertLogEvent(Log::EVENT_PASSWORD);
    }

    public function testEventDelete()
    {
        $this->loginAction();
        $this->deleteUser();
        $this->assertLogEvent(Log::EVENT_DELETE);
    }

    /**
     * @TODO Finish after add ajax request on logout action
     */
    public function testEventLogout() { }

    /**
     * Initialize $_SESSION for login process
     */
    private function initDummySession()
    {
        if (!isset($_SESSION)) {
            $_SESSION = [];
        }
    }

    /**
     * Initialize Models
     */
    private function initModels()
    {
        $this->logModel = new \erdiko\users\models\user\event\Log();
        $this->logEntity = new \erdiko\users\entities\user\event\Log();
        $this->userModel = new User();
    }

    /**
     *  Initialize Basic Login Data
     */
    private function initBasicLoginData()
    {
        $config     = \Erdiko::getConfig();
        $this->loginData = [
            'secret_key' => $config["site"]["secret_key"]
        ];
    }

    /**
     * Retrieve Valid Credentials
     *
     * @return array
     */
    private function getValidCredentials()
    {
        return array_merge($this->loginData, $this->validCredentials);
    }

    /**
     * Retrieve Invalid Credentials
     *
     * @return array
     */
    private function getInvalidCredentials($user)
    {
        $invalidCredentials = $this->validCredentials;
        $invalidCredentials['password'] = rand(0, 99999);
        if (!$user) {
            $invalidCredentials['username'] = $invalidCredentials['username'].rand(0, 99999);
        }

        return array_merge($this->loginData, $invalidCredentials);
    }

    /**
     * Login Action
     *
     * @param bool $valid
     * @return bool
     */
    protected function loginAction($valid=true, $user=true)
    {
        $authenticator = new JWTAuthenticator(new User());
        $config     = \Erdiko::getConfig();
        $secretKey  = $config["site"]["secret_key"];
        $credentials = $valid ? $this->getValidCredentials() : $this->getInvalidCredentials($user);
        $this->logData = ['email' => $credentials['username']];
        $authParams = $credentials;
        $authParams['secret_key'] = $secretKey;

        try {
            $result = $authenticator->login($authParams, 'jwt_auth');
            $this->user = $result->user->getEntity();
            return true;
        } catch (\Exception $e) {
            // Mute Exception to continue with the process.
        }

        $this->user = $this->userModel->getGeneral()->getEntity();
        $this->logData['message'] = "User {$credentials['username']} not found.";
        $users = $this->userModel->getByParams(['email'=>$credentials['username']]);
        if (count($users)>0) {
            $this->user = $users[0];
            $this->logData['message'] = "Invalid Password";
        }
        return false;
    }

    /**
     * Create Event Log
     *
     * @param $event
     */
    private function createLogEvent($event)
    {
        unset($this->logData['password']);
        $this->logModel->create($this->user->getId(), $event, $this->logData);
    }

    /**
     * Retrieve latest Log Event
    const EVENT_PASSWORD = 'event-user-change-password';
     */
    private function getLatestLogEvent()
    {
        $logs = $this->logModel->getLogs(0, 1, 'id', 'desc');
        return $logs->logs[0];
    }

    /**
     * Test all fields
     *
     * @param $event
     */
    private function assertLogEvent($event)
    {
        $latestLogEvent = $this->getLatestLogEvent();
        $eventData = (array)$latestLogEvent->getEventData();
        unset($eventData['password']);
        unset($this->logData['password']);
        unset($eventData['new_password']);
        unset($this->logData['new_password']);

        $this->assertEquals($this->user->getId(), $latestLogEvent->getUserId());
        $this->assertEquals($event, $latestLogEvent->getEventLog());
        $this->assertEquals($this->logData, $eventData);
    }

    private function createUser()
    {
        $rand = rand(0, 99999);
        $userData = $this->logData = [
            'email' => 'username@test'.$rand.'.com',
            'password' => 'password'.$rand,
            'role'  => rand(1,2),
            'name'  => 'User Test Name'.$rand,
        ];

        $user = new User();
        $user->createUser($userData);
    }

    private function updateUser()
    {
        $userData = $this->getLatestUser()->marshall('array');
        $userData['name'] = $userData['name'] . ' Updated';
        $this->logData = $userData;

        $user = new User();
        $user->save($userData);
    }

    private function changePassword()
    {
	    $userData = $this->getLatestUser()->marshall('array');
        $userData['new_password'] ='newpassword';

        $this->logData = $userData;

        $user = new User();
        $user->save($userData);

        $this->logData['role'] = $user->getRole();
    }

    private function deleteUser()
    {
        $userData = $this->getLatestUser()->marshall('array');
        $this->logData = ['id' => $userData['id']];

        $user = new User();
        $user->deleteUser($userData['id']);
    }

    private function getLatestUser()
    {
        $users = $this->userModel->getUsers(0, 1, 'id', 'desc');
        return $users->users[0];
    }

}
