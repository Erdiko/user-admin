# Doctrine

Use the Doctrine ORM in your framework.  This package will install Doctrine and include a way to configure your db credentials.

Install
-------

To use doctrine in your Erdiko project simply run

    composer require erdiko/doctrine

Then update /app/config/shared/database.json with the specifics of your database

You're all set!  Create some entities/models and you'll be working with Doctrine

If you don't have a config file called /app/config/shared/database.json then copy the one in this package into that location (located at /vendor/erdiko/doctrine/app/config/shared/database.json)

Extras
------

We added some sample code of how to use Doctrine.  It includes a sample entity and model to query the entity.  Code is located at /vendor/erdiko/doctrine/app/

It's a great way to get going, but the best way to learn how to use doctrine is to visit the site and read the docs.  

http://www.doctrine-project.org/

