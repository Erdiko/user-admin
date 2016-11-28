<?php
/**
 * Response
 * base response, all response objects should inherit from here
 *
 * @category   Erdiko
 * @package    Core
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author     John Arroyo
 */
namespace erdiko\core;


/** Response Class */
class Response
{
    /** Theme object */
    protected $_theme = null;
    /** Theme name */
    protected $_themeName;
    /** Theme template */
    protected $_themeTemplate = 'default';
    /** Theme Ignore (if set to true output is rendered without theme) */
    protected $_themeIgnore = false;    
    /** Content */
    protected $_content = null;
    /** Data */
    protected $_data = array();
    
    /**
     * Constructor
     *
     * @param Theme $theme - Theme Object (Container)
     */
    public function __construct($theme = null)
    {
        $this->_theme = $theme;
    }

    /**
     * Set key value data
     *
     * @param mixed $key
     * @param mixed $value
     */
    public function setKeyValue($key, $value)
    {
        $this->_data[$key] = $value;
    }

    /**
     * Get data value by key
     *
     * @param mixed $key
     * @return mixed
     */
    public function getKeyValue($key)
    {
        return empty($this->_data[$key]) ? null: $this->_data[$key];
    }

    /**
     * Add a pool of key/values segmented by type
     * This is useful for js/css includes and other grouped data
     */
    public function addTypedKeyValue($type, $key, $value)
    {
        if(empty($this->_data[$type]))
            $this->_data[$type] = array();
        $this->_data[$type][$key] = $value;
    }

    /**
     * Set theme
     *
     * @param Theme object $theme - Theme Object (Container)
     */
    public function setTheme($theme)
    {
        $this->_theme = $theme;
    }

    /**
     * Get theme
     *
     * @return Theme Object $theme
     */
    public function getTheme()
    {
        if($this->_theme === null)
            $this->_theme = new \erdiko\core\Theme($this->getThemeName(), null, $this->getThemeTemplate());

        return $this->_theme;
    }

    /**
     * Set Theme Name
     *
     * @param string $themeName
     */
    public function setThemeName($themeName)
    {
        $this->_themeName = $themeName;
    }

    /**
     * Get the theme name
     * Name pecking order: response, theme, config
     *
     * @return string $name
     */
    public function getThemeName()
    {
        if(!empty($this->_themeName))
            $name = $this->_themeName;
        elseif(!empty($this->_theme))
            $name = $this->_theme->getName();
        else
            $name = Helper::getConfig()['theme']['name'];
        
        return $name;
    }

    /**
     * Set Theme Template
     *
     * @param string $tamplate
     */
    public function setThemeTemplate($template)
    {
        $this->_themeTemplate = $template;
        if ($this->getTheme() != null) {
            $this->getTheme()->setTemplate($this->_themeTemplate);
        }
    }

    /**
     * Get the theme template
     *
     * @return string $_themeTemplate
     */
    public function getThemeTemplate()
    {
        return $this->_themeTemplate;
    }

    /**
     * Set content
     *
     * @param Container $content - e.g. View or Layout Object
     */
    public function setContent($content)
    {
        $this->_content = $content;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->_content;
    }

    /**
     * Append some html content to the existing content
     *
     * @param string $content
     * @todo check to see if content is a container, if so treat accordingly
     */
    public function appendContent($content)
    {
        $this->_content .= $content;
    }
    
    /**
     * Render
     *
     * @return string
     */
    public function render()
    {
        // Render all objects to html (string)
        $html = (string) $this->_content;

        if (!$this->_themeIgnore) {
            $theme = $this->getTheme();
            $theme->setContent($html); // rendered html (body content)
            $html = (string) $theme;
        }

        return $html;
    }

    /**
     * Render and send data to browser then end request
     *
     * @notice USE WITH CAUTION, 
     *  This should be called at the end of processing the response
     */
    public function send()
    {
        echo $this->render();
        die();
    }
}
