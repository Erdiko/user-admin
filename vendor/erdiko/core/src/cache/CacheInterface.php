<?php
/**
 * Interface for all supported php caches
 *
 * @category    core
 * @package     cache
 * @copyright   Copyright (c) 2016, Arroyo Labs, www.arroyolabs.com
 * @author      Varun Brahme
 * @author      John Arroyo, john@arroyolabs.com
 */
namespace erdiko\core\cache;

/**
 * Cache Interface
 */
interface CacheInterface
{
    /**
     * Put cache
     */
    public function put($key, $data);
    
    /**
     * Get cache by key
     */
    public function get($key);

    /**
     * Check if the cache exists
     */
    public function has($key);
    
    /**
     * Delete cache by key
     */
    public function delete($key);
    
    /**
     * Delete all cache
     */
    public function clear();
}
