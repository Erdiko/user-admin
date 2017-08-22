<?php

namespace tests\phpunit;

require_once dirname(__DIR__) . '/ErdikoTestCase.php';

use erdiko\users\models\User;
use erdiko\users\models\user\event\Log;
use GuzzleHttp\Client;
use \tests\ErdikoTestCase;
use \erdiko\authenticate\services\JWTAuthenticator;

class DatabaseErrorsTest extends ErdikoTestCase
{
    /**
     * @var Client
     */
    protected $client;
    protected $originalDatabase;
    protected $jsonDatabasePath;
    protected $jsonDatabase;

    protected $credentialsAsSuper = [
        'email' => 'erdiko.super@arroyolabs.com',
        'password' => 'master_password'
    ];

    protected $requestOptions = [];

    public function setup()
    {
        $this->client = new Client(['base_uri' => 'http://webserver']);
        $this->jsonDatabasePath = realpath(__DIR__.'/../../app/config/shared/database.json');
        $this->loadJsonDatabase();
        $this->saveOriginalDbName();
        $this->setInvalidDb();
    }

    protected function loadJsonDatabase()
    {
        $this->jsonDatabase = $this->getDatabaseJson();
    }

    protected function saveOriginalDbName()
    {
        $this->originalDatabase = $this->jsonDatabase->connections->master->database;
    }

    protected function setInvalidDb()
    {
        $this->jsonDatabase->connections->master->database = '_invalid_database_';
        $this->changeDbInJson();
    }

    protected function setValidDb()
    {
        $this->jsonDatabase->connections->master->database = $this->originalDatabase;
        $this->changeDbInJson();
    }

    protected function getDatabaseJson()
    {
        return json_decode(file_get_contents($this->jsonDatabasePath));
    }

    protected function changeDbInJson()
    {
        file_put_contents($this->jsonDatabasePath, json_encode($this->jsonDatabase, JSON_PRETTY_PRINT));
    }

    public function tearDown()
    {
        $this->setValidDb();
    }

    protected function login()
    {
        $response = $this->client->post('/ajax/users/authentication/login', ['json' => $this->credentialsAsSuper]);
        $phpsessid = $this->getPhpsessid($response->getHeader('Set-Cookie'));

        $jsonResponse = $this->getJsonResponse($response);
        $token = $jsonResponse->body->token;

        $this->requestOptions = ['headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer '.$token,
            'Cookie' => $phpsessid
        ]];

        return $jsonResponse;
    }

    /**
     * @expectedException GuzzleHttp\Exception\ServerException
     */
    public function testInvalidDatabase()
    {
            $loginResponse = $this->login();
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

    protected function makeCall($method, $uri)
    {
        $response = $this->client->request($method, $uri, $this->requestOptions);
        return $this->getJsonResponse($response);
    }

    protected function post($uri)
    {
        return $this->makeCall('GET', $uri);
    }

    protected function get($uri)
    {
        return $this->makeCall('GET', $uri);
    }

}
