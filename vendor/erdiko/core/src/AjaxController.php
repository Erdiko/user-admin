<?php
/**
 * Ajax Controller
 *
 * Base request handler, all ajax controllers should inherit this class.
 *
 * @category   Erdiko
 * @package    Core
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 *
 * @author     John Arroyo john@arroyolabs.com
 * @author     Andy Armstrong andy@arroyolabs.com
 */
namespace erdiko\core;


/**
 * AjaxController class
 */
class AjaxController extends Controller
{

  /**
   * Contructor
   */
    public function __construct()
    {
        $this->_webroot = ERDIKO_ROOT;
        $this->_response = new \erdiko\core\AjaxResponse;
    }

    /** 
     * Before 
     */
    public function _before()
    {
        // Do nothing, it overrides the core before function which prepares for theming
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
