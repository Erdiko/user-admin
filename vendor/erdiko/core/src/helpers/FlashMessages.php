<?php
/**
 * FlashMessages
 * Add and retrieve flash messages.
 * Flash messages are stored in session.
 * Types of messages: success, info, warning, danger
 *
 * @category    core
 * @package     helpers
 * @copyright   Copyright (c) 2016, Arroyo Labs, www.arroyolabs.com
 * @author      John Arroyo, john@arroyolabs.com
 */
namespace erdiko\core\helpers;

class FlashMessages
{
	/**
	 * Reset the messages
	 */
	public static function reset()
	{
		$_SESSION['erdiko_flash_message'] = array();
	}

	/**
	 * Set flash message
	 * Add a message to the array
	 * @note: Should we restrict/limit types to only the 4 listed in the header?
	 * @param string $message
	 * @param string $type
	 */
	public static function set($message, $type = 'danger')
	{
		$_SESSION['erdiko_flash_message'][] = array(
			'text' => $message,
			'type' => $type
			);

		$_SESSION['erdiko_flash_message'];
	}

	/**
	 * Get flash messages
	 * @return array $messages
	 */
	public static function get()
	{
		$messages = array();
		if(isset($_SESSION['erdiko_flash_message']))
			$messages = $_SESSION['erdiko_flash_message'];
		self::reset();
		
		return $messages;
	}
	
}