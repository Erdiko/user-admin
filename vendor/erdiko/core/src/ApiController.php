<?php
/**
 * Api Controller
 *
 * Base API request handler, all API controllers should be a subclass of this.
 * @note don't use this class just yet, WIP
 * @todo finish this class, right now it mimicks the Ajax controller/response
 *
 * @category   Erdiko
 * @package    Core
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 *
 * @author     John Arroyo john@arroyolabs.com
 */
namespace erdiko\core;


/**
 * ApiController class
 */
class ApiController extends Controller
{

  /**
   * Contructor
   */
    public function __construct()
    {
        $this->_webroot = ERDIKO_ROOT;
        $this->_response = new \erdiko\core\ApiResponse;
    }

  /**
   * setStatusCode
   *
   */
    public function setStatusCode($code = null)
    {
        if (!empty($code)) {
            $this->_response->setStatusCode($code);
        }
    }

    public function setErrors($errors = null)
    {
        if (!empty($errors)) {
            $this->_response->setErrors($errors);
        }
    }
}
