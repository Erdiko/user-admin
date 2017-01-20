<?php
/**
 * Session
 *
 * @package     erdiko/core
 * @copyright   2012-2017 Arroyo Labs, Inc. http://www.arroyolabs.com
 * @author      Varun Brahme
 * @author      John Arroyo <john@arroyolabs.com>
 */

// Start the session
if (!isset($_SESSION)) {
    session_start();
}
