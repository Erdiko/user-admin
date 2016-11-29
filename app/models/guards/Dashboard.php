<?php


/**
 * Dashboard
 *
 * @category    Erdiko
 * @package     Authorize
 * @copyright   Copyright (c) 2016, Arroyo Labs, http://www.arroyolabs.com
 * @author      Leo Daidone, leo@arroyolabs.com
 */


namespace app\models\guards;


use AC\Kalinka\Guard\BaseGuard;

class Dashboard extends BaseGuard
{
  public function getActions()
  {
    return ["read"];
  }
}