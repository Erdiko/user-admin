<?php

namespace tests\phpunit;

require_once dirname(__DIR__) . '/ErdikoTestCase.php';

use erdiko\users\models\User;
use erdiko\users\models\user\event\Log;
use \tests\ErdikoTestCase;

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
        'username' => 'erdiko@arroyolabs.com',
        'password' => 'password'
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
        $this->createLogEvent(Log::EVENT_LOGIN);
        $this->assertLogEvent(Log::EVENT_LOGIN);
    }

    public function testEventAttempt()
    {
        $this->assertFalse($this->loginAction(false));
        $this->createLogEvent(Log::EVENT_ATTEMPT);
        $this->assertLogEvent(Log::EVENT_ATTEMPT);
    }

    public function testEventCreate()
    {
        $this->loginAction();
        $this->prepareCreateEventData();
        $this->createLogEvent(Log::EVENT_CREATE);
        $this->assertLogEvent(Log::EVENT_CREATE);
    }

    public function testEventUpdate()
    {
        $this->loginAction();
        $this->prepareUpdateEventData();
        $this->createLogEvent(Log::EVENT_UPDATE);
        $this->assertLogEvent(Log::EVENT_UPDATE);
    }

    public function testEventChangePassword()
    {
        $this->loginAction();
        $this->prepareChangePasswordEventData();
        $this->createLogEvent(Log::EVENT_PASSWORD);
        $this->assertLogEvent(Log::EVENT_PASSWORD);
    }

    public function testEventDelete()
    {
        $this->loginAction();
        $this->prepareDeleteEventData();
        $this->createLogEvent(Log::EVENT_DELETE);
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
    private function getInvalidCredentials()
    {
        $invalidCredentials = $this->validCredentials;
        $invalidCredentials['password'] = rand(0, 99999);

        return array_merge($this->loginData, $invalidCredentials);
    }

    /**
     * Login Action
     *
     * @param bool $valid
     * @return bool
     */
    protected function loginAction($valid=true)
    {
        $authenticator = new \erdiko\authenticate\services\JWTAuthenticator(new User());
        $credentials = $valid ? $this->getValidCredentials() : $this->getInvalidCredentials();
        $this->logData = $credentials;
        try {
            $result = $authenticator->login($credentials);
            $this->user = $result->user->getEntity();
        } catch (\Exception $e) {
            $users = $this->userModel->getByParams(['username'=>$credentials['username']]);
            $this->user = $users->users[0];
            return false;
        }
        return true;
    }

    /**
     * Create Event Log
     *
     * @param $event
     */
    private function createLogEvent($event)
    {
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

        $this->assertEquals($this->user->getId(), $latestLogEvent->getUserId());
        $this->assertEquals($event, $latestLogEvent->getEventLog());
        $this->assertEquals($this->logData, (array)$latestLogEvent->getEventData());
    }

    private function prepareCreateEventData()
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

    private function prepareDeleteEventData()
    {
        $user = $this->getLatestUser();
        $this->logData = ['id' => $user->getId()];
        $this->userModel->deleteUser($user->getId());
    }

    private function prepareUpdateEventData()
    {
        $userData = $this->getLatestUser()->marshall('array');
        $userData['name'] = $userData['name'] . ' Updated';
        $this->logData = $userData;

        $this->userModel->save($userData);
    }

    private function prepareChangePasswordEventData()
    {
        $user = $this->getLatestUser();
        $userData = ['id' => $user->getId(), 'password' => 'newpassword'];
        $this->logData = $userData;

        $this->userModel->save($userData);
    }

    private function getLatestUser()
    {
        $users = $this->userModel->getUsers(0, 1, 'id', 'desc');
        return $users->users[0];
    }

}
