<?php
/**
 * Cache using the filesystem
 *
 * @package     erdiko/core
 * @copyright   2012-2017 Arroyo Labs, Inc. http://www.arroyolabs.com
 * @author      Varun Brahme
 * @author      John Arroyo <john@arroyolabs.com>
 */
namespace erdiko\core\cache;

use erdiko\core\cache\CacheInterface;


class File extends \erdiko\core\datasource\File implements CacheInterface
{
    /** Constructor */
    public function __construct($cacheDir = null)
    {
        if (!isset($cacheDir)) {
            $cacheDir = ERDIKO_VAR."/cache";
        }
        parent::__construct($cacheDir);
    }

    /**
     * Get Key Code
     *
     * @param string $key
     * @return string
     */
    public function getKeyCode($key)
    {
        return md5($key);
    }

    /**
     * Put Key
     *
     * @param mixed $key
     * @param mixed $data
     */
    public function put($key, $data)
    {
        $filename = $this->getKeyCode($key);
        $data = json_encode($data);
        $this->write($data, $filename);
    }
    
    /**
     * Get Key
     *
     * @param string @key
     * @return mixed
     */
    public function get($key)
    {
        $filename = $this->getKeyCode($key);

        if ($this->fileExists($filename)) {
            $value = $this->read($filename);
        } else {
            return null;
        }

        return json_decode($value, true);
    }
    
    /**
     * Delete a key
     *
     * @param string @key
     * @note path is only for compatibility, do not use
     */
    public function delete($key, $path = null)
    {
        $filename = $this->getKeyCode($key);
        parent::delete($filename, $path);
    }

    /**
     * Delete all keys
     */
    public function clear()
    {
        $files = glob(ERDIKO_VAR."/cache/*");
        foreach ($files as $file) {
            if (is_file($file)) {
                parent::delete(basename($file));
            }
        }
    }

    /**
     * Check if a key exists
     *
     * @param mixed $key
     * @return bool
     */
    public function has($key)
    {
        $filename = $this->getKeyCode($key);
        return $this->fileExists($filename);
    }
}
