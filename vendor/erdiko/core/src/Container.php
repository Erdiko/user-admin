<?php
/**
 * Container
 * Base view layer object
 * @todo add an interface too
 *
 * @category   Erdiko
 * @package    Core
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author     John Arroyo
 */
namespace erdiko\core;

/**
 * Container Class
 */
abstract class Container
{
    use Template;
    
    /**
     * Constructor
     * @param string $template , Theme Object (Contaier)
     * @param mixed $data
     */
    public function __construct($template = null, $data = null)
    {
        $this->initiate($template, $data);
        // $this->setTemplateFolder('views');
    }

    /**
     * Get template folder filesystem path
     */
    public function getTemplateFolderPath()
    {
        return $this->_templateRootFolder.'/'.$this->_templateFolder.'/';
    }
}