<?php
/**
 * Api Response
 *
 * @category   Erdiko
 * @package    Core
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 *
 * @author     John Arroyo john@arroyolabs.com
 */
namespace erdiko\core;


class ApiResponse extends Response
{

    /**
     * _statusCode
     *
     * Unless explicitly set, default to a 200 status
     * assuming everything went ok.
     */
    protected $_statusCode = 200;

    /**
     * _errors
     *
     *
     */
    protected $_errors = false;

    /**
     * Theme
     */
    protected $_theme;

    /**
     * Content
     */
    protected $_content = null;



    /**
     * setStatusCode
     *
     * Set, and send, the HTTP status code.
     */
    public function setStatusCode($code = null)
    {
        if (!empty($code)) {
            $this->_statusCode = $code;
            http_response_code($this->_statusCode); // this sends the http status code
        }
    }

    public function setErrors($errors = null)
    {
        if (!empty($errors)) {
            if (!is_array($errors)) {
                $errors = array($errors);
            }

            $this->_errors = $errors;
        }
    }

    /**
     * Ajax render function
     * @todo add support for xml
     *
     * @return string
     */
    public function render()
    {
        $responseData = array(
            "status" => $this->_statusCode,
            "body"   => $this->_content,
            "errors" => $this->_errors
        );

        return json_encode($responseData);
    }

    /**
     * Render and send data to browser then end request
     *
     * @todo allow switching between json and xml
     * @note This should only be called at the very end of processing the response
     */
    public function send()
    {
        // set the mime type to JSON
        header('Content-Type: application/json');

        echo $this->render();
        die();
    }
}
