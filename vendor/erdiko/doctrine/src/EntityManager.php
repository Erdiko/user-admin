<?php
/**
 * EntityManager
 *
 * @category   Erdiko
 * @package    Doctrine
 * @copyright  Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 *
 * @author     John Arroyo john@arroyolabs.com
 */
namespace erdiko\doctrine;

class EntityManager
{
    /**
    * Get Doctrine entity manager
    * @param string $db, default to the 'default' database in the config
    * @param string 
    */
    public static function getEntityManager($db = null, $context = 'shared')
    {
        // Get db config info from file
        $dbConfig = \erdiko\core\Helper::getConfig("database", $context);
        if($db == null)
            $db = $dbConfig['default'];
        $dbParams = $dbConfig['connections'][$db];
        $dbParams['dbname'] = $dbParams['database'];
        $dbParams['user'] = $dbParams['username'];

        $paths = array(APPROOT.$dbConfig['entities']);
        $isDevMode = isset($dbConfig['is_dev_mode']) ? (bool)$dbConfig['is_dev_mode'] : false;
        $config = \Doctrine\ORM\Tools\Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
        
        // Create and return the entity manager
        return \Doctrine\ORM\EntityManager::create($dbParams, $config);
    }

    /**
     * Update a single record
     * Convenience method to update a row.  
     * You should use the Doctrine EntityManager directly to take control of the Entity merge process.
     * @note do we need this?
     */
    public static function update($entity)
    {
        $entityManager = self::getEntityManager();
        $entity = $entityManager->merge($entity);
        $entityManager->flush(); // transact

        return $entity;
    }
}