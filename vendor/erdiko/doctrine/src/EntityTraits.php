<?php 
/**
 * EntityTraits
 *
 * Convenient db traits to be used with models and service models
 * 
 * @package     erdiko/doctrine
 * @copyright   2012-2017 Arroyo Labs, Inc. http://www.arroyolabs.com
 * @author      John Arroyo <john@arroyolabs.com>
 */
namespace erdiko\doctrine;

trait EntityTraits 
{
    /**
     * getEntityManager
     * 
     * @param string $db, name of the db to connect to
     * @return \Doctrine\ORM\EntityManager $em
     */
    public function getEntityManager($db = null)
    {
        return \erdiko\doctrine\EntityManager::getEntityManager($db);
    }

    /**
     * getRepository
     *
     * @param string $entityName, the name of the entity
     * @param string $db, name of the db to connect to
     * @return \Doctrine\ORM\EntityRepository The repository class
     */
    public function getRepository($entityName, $db = null)
    {
        return \erdiko\doctrine\EntityManager::getEntityManager()->getRepository($entityName);
    }
}