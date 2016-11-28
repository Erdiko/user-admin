<?php
/**
 * View
 *
 * @category   Erdiko
 * @package    Core
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author     John Arroyo
 */
namespace erdiko\core;

/** View Class */
class View extends Container
{
    protected $_config = null;

    /**
     * Constructor
     * @param string $template
     * @param mixed $data
     * @param string $templateFolder
     */
    public function __construct($template = null, $data = null, $templateRootFolder = ERDIKO_APP)
    {
        $this->initiate($template, $data, $templateRootFolder);
        $this->setTemplateFolder('views');
    }

    /**
     * Attach getView function to the mustache view
     */
    public function renderMustache($filename, $data) {
        // This is for mustache compatibility
        $data['getView'] = function($name, $data) { 
            return $this->getView($name, $data); 
            };
        return parent::renderMustache($filename, $data);
    }

    /**
     * Get a view, for nesting views
     * This is a convenience wrapper for inherited getTemplateFile() method
     * Notes: expects this sub view to be in the same views folder (or nested below this folder relative to views/).
     * 
     */
    public function getView($filename, $data = null)
    {
        // $data = ($data === null) ? $this->_data : $data;
        return $this->getTemplateFile($this->getTemplateFolder().$filename, $data);
    }
}
