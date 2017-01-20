<?php
/**
 * Ajax Controller
 *
 * Base request handler, all ajax controllers should inherit this class.
 *
 * @package     erdiko/core
 * @copyright   2012-2017 Arroyo Labs, Inc. http://www.arroyolabs.com
 * @author      John Arroyo <john@arroyolabs.com>
 * @author      Andy Armstrong <andy@arroyolabs.com>
 */
namespace erdiko\core;


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
