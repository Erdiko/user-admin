<?php

namespace erdiko\users\tests\phpunit;

use erdiko\authenticate\services\JWTAuthenticator;
use erdiko\users\controllers\admin\UserAjax;
use erdiko\users\models\User;
use GuzzleHttp\Client;

require_once dirname(__DIR__) . '/ErdikoTestCase.php';

class UserAjaxTest extends \tests\ErdikoTestCase
{
    /**
     * @var Client
     */
    protected $client;

    protected $credentialsAsSuper = [
        'email' => 'erdiko.super@arroyolabs.com',
        'password' => 'master_password'
    ];

    protected $credentialsAsUser = [
        'email' => 'user.bar@arroyolabs.com',
        'password' => 'barpassword'
    ];

    protected $requestOptions = [];

    protected $hosts = [
        'http://webserver',
        'http://erdiko.local',
        'http://erdiko_users_web',
        'http://localhost',
        'http://127.0.0.1',
        'http://0.0.0.0',
    ];

//    public function testCurl()
//    {
//        foreach ($this->hosts as $host) {
//            $this->callWithCurl($host);
//        }
//    }
//
//    public function testGuzzle()
//    {
//        foreach ($this->hosts as $host) {
//            $this->callWithGuzzle($host);
//        }
//    }

    protected function callWithCurl($host)
    {
        $data_string = json_encode($this->credentialsAsSuper);

        $ch = curl_init($host.'/ajax/users/authentication/login');
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data_string))
        );

        $result = curl_exec($ch);

        if ($result === FALSE) {
            var_dump(curl_errno($ch));
        }

        var_dump($result);
    }

    protected function callWithGuzzle($host)
    {
        $this->client = new Client(['base_uri' => $host]);

        try {
            $response = $this->client->post('/ajax/users/authentication/login', ['json' => $this->credentialsAsSuper]);
            $jsonResponse = $this->getJsonResponse($response);

            var_dump($jsonResponse);
        } catch (\Exception $e) {
            var_dump( $e->getMessage() );
        }

    }

    public function setup()
    {
        $this->client = new Client(['base_uri' => 'http://webserver/']);
    }

    protected function login($credentials)
    {
        $response = $this->client->post('/ajax/users/authentication/login', ['json' => $credentials]);
        $phpsessid = $this->getPhpsessid($response->getHeader('Set-Cookie'));

        $jsonResponse = $this->getJsonResponse($response);
        $token = $jsonResponse->body->token;

        $this->requestOptions = ['headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$token,
            'Cookie' => $phpsessid
        ]];
    }

    protected function loginAsUser()
    {
        $this->login($this->credentialsAsUser);
    }

    protected function loginAsSuper()
    {
        $this->login($this->credentialsAsSuper);
    }

    protected function getPhpsessid($setCookie)
    {
        $setCookieRaw = explode(';', $setCookie[0]);
        return $setCookieRaw[0];
    }

    protected function getJsonResponse($response)
    {
        return json_decode($response->getBody());
    }

    protected function setJsonDataRequest($data)
    {
        $this->requestOptions['json'] = $data;
    }

    public function testPostCreateSuccess()
    {
        $this->loginAsSuper();
        $response = $this->postCreate();
        $this->assertSuccessCall($response);

        return $response->body->user;
    }

    public function testPostCreateFail()
    {
        $this->loginAsUser();
        $response = $this->postCreate();
        $this->assertFailCall($response);
    }

    protected function postCreate()
    {
        $createUserData = [
            "email" => "user.create+".rand(0,9999)."@email.com",
            "name" => "Customer Name",
            "password" => "123456",
            "role" => "1"
        ];
        $this->setJsonDataRequest($createUserData);
        return $this->makeCall('POST', '/ajax/erdiko/users/admin/create');
    }

//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testUpdateSuccess($user)
//    {
//        $this->loginAsSuper();
//        $response = $this->postUpdate($user);
//        $this->assertSuccessCall($response);
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testUpdateFail($user)
//    {
//        $this->loginAsUser();
//        $response = $this->postUpdate($user);
//        $this->assertFailCall($response);
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     *
//     * @return mixed
//     */
//    protected function postUpdate($user)
//    {
//        $updateUserData = [
//            "id" => $user->id,
//            "email" => $user->email,
//            "name" => $user->name . ' Update',
//            "role" => "1"
//        ];
//        $this->setJsonDataRequest($updateUserData);
//        return $this->makeCall('POST', '/ajax/erdiko/users/admin/update');
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testChangePassSuccess($user)
//    {
//        $this->loginAsSuper();
//        $response = $this->postChangePass($user);
//        $this->assertSuccessCall($response);
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testChangePassFail($user)
//    {
//        $this->loginAsUser();
//        $response = $this->postChangePass($user);
//        $this->assertFailCall($response);
//    }
//
//    protected function postChangePass($user)
//    {
//        $updatePassData = [
//            'id' => $user->id,
//            'email' => $user->email,
//            'password' => 'password',
//            'newpass' => 'newpass'
//        ];
//        $this->setJsonDataRequest($updatePassData);
//        return $this->makeCall('POST', '/ajax/erdiko/users/admin/changepass');
//    }
//
//    public function testListSuccess()
//    {
//        $this->loginAsSuper();
//        $response = $this->getList();
//        $this->assertSuccessCall($response);
//    }
//
//    public function testListFail()
//    {
//        $response = $this->getList();
//        $this->assertFailCall($response);
//    }
//
//    protected function getList()
//    {
//        return $this->makeCall('GET', '/ajax/erdiko/users/admin/list');
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testRetrieveSuccess($user)
//    {
//        $this->loginAsSuper();
//        $response = $this->getRetrieve($user);
//        $this->assertSuccessCall($response);
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testRetrieveFail($user)
//    {
//        $response = $this->getRetrieve($user);
//        $this->assertFailCall($response);
//    }
//
//    protected function getRetrieve($user)
//    {
//        return $this->makeCall('GET', '/ajax/erdiko/users/admin/retrieve?id='.$user->id);
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testDeleteSuccess($user)
//    {
//        $this->loginAsSuper();
//        $response = $this->postDelete($user);
//        $this->assertSuccessCall($response);
//    }
//
//    /**
//     * @depends testPostCreateSuccess
//     */
//    public function testDeleteFail($user)
//    {
//        $this->loginAsUser();
//        $response = $this->postDelete($user);
//        $this->assertFailCall($response);
//    }
//
//    protected function postDelete($user)
//    {
//        $deleteUserData = [
//            'id' => $user->id,
//        ];
//        $this->setJsonDataRequest($deleteUserData);
//        return $this->makeCall('POST', '/ajax/erdiko/users/admin/delete');
//    }

    protected function makeCall($method, $uri)
    {
        $response = $this->client->request($method, $uri, $this->requestOptions);
        return $this->getJsonResponse($response);
    }

    protected function assertSuccessCall($response)
    {
        $this->assertSuccessResponse($response);
        $this->assertSuccessBody($response);
    }

    protected function assertFailCall($response)
    {
        $this->assertErrorResponse($response);
        $this->assertErrorBody($response);
    }

    protected function assertSuccessResponse($response)
    {
        $this->assertEquals($response->status, 200);
        $this->assertFalse($response->errors);
        $this->assertNotEmpty($response->body);
    }

    protected function assertErrorResponse($response)
    {
        $this->assertEquals($response->status, 200);
        $this->assertFalse($response->errors);
        $this->assertNotEmpty($response->body);
    }

    protected function assertSuccessBody($response)
    {
        $this->assertNotEmpty($response->body->method);
        $this->assertTrue($response->body->success);
        $this->assertEquals($response->body->error_code, 0);
        $this->assertEmpty($response->body->error_message);
    }

    protected function assertErrorBody($response)
    {
        $this->assertNotEmpty($response->body->method);
        $this->assertFalse($response->body->success);
        $this->assertNotEquals($response->body->error_code, 0);
        $this->assertNotEmpty($response->body->error_message);
    }

}
