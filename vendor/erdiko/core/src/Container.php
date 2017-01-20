<?php
/**
 * Container
 * Base view layer object
 * @todo add an interface too
 *
 * @package     erdiko/core
 * @copyright   2012-2017 Arroyo Labs, Inc. http://www.arroyolabs.com
 * @author      John Arroyo <john@arroyolabs.com>
 */
namespace erdiko\core;


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