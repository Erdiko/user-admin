User Admin
==========

[![Package version](https://img.shields.io/packagist/v/erdiko/user-admin.svg?style=flat-square)](https://packagist.org/packages/erdiko/user-admin) [![Travis CI](https://travis-ci.org/Erdiko/user-admin.svg?branch=master)](https://travis-ci.org/Erdiko/user-admin) [![License](https://poser.pugx.org/erdiko/user-admin/license)](https://packagist.org/packages/erdiko/user-admin)

Goal: A fully functional and modular user management system with an Angular 2 UI.

**Note this is an active development project and not quite ready for production yet**

It is based on a few erdiko packages (authorize, authenticate, and users) as well as the [Angular CLI](https://github.com/angular/angular-cli) project.


Application
-----------

The UI is an Angular CLI project using an erdiko web application to interact with the database. Erdiko loads the Angular 2 application as well as serves the AJAX routes.

We chose to use Angular CLI since it makes it very simple to create new components as well as creating basic unit and functional tests for the developer. We also wanted to provide a method to allow the user to easily test their code as they developed yet still compile and serve the smallest code when serving to the end user.


Installation
------------

#### Create your project using composer

`composer create erdiko/user-admin [PROJECT NAME]`

##### Note about versions

Since this project is still under heavy development we recommend running the latest from the develop branch.  If you would like to tell composer to use the develop branch use this command instead of the one above. 

`composer create erdiko/user-admin:dev-develop [PROJECT NAME]`

#### Create your docker containers

Enter your newly created project directory and run docker compose.

`cd [PROJECT NAME]`

`docker-compose up -d`

If you don't have docker compose installed you can install by following the instructions here, [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).  You can, of course, just create create your own lamp stack if you wish.  If you create your own enviornment the weboot is /public/default/ and the database config is in /app/config/shared/database.json

#### Install the users database

If you're running the docker container, installing the db is easy.  Just run the scripts/install-db.sh script.

If you are not using the docker script then simply restore the sql dump found in vendor/erdiko/users/sql/dumps/user-admin.sql.  Update app/config/shared/database.json with the connection information for your mysql server.

Check the users README if you need more information [https://github.com/Erdiko/users](https://github.com/Erdiko/users).

#### View your new project in your browser

[http://docker.local:8088/](http://docker.local:8088/)


Editing & Compiling the Angular Code
------------------------------------

Editing and compiling the Angular code is simple, and we use Angular CLIs test server to allow you to edit your code and test in real time.

1. Go to the `user-admin` theme directory under `user-admin/app/themes/user-admin`
1. Install all dependencies via npm: `npm i`
1. Start the development server: `npm run start`
1. Edit the typescript found in the `src` directory and save in another terminal window or tab, watch for compiler errors

## NPM Run Commands

* Start the Development server: `npm run start`
* Run the unit tests: `npm run test`
* Run the e2e/functional tests: `npm run e2e`
* Compile and export files for end user: `npm run build`


Local Development
-----------------

To set your environment up for local development, please follow these steps:

* Clone your fork of the User Admin project into a local directory
* Clone the following packages into the same directory
  * [Authenticate](https://github.com/Erdiko/authenticate)
  * [Authorize](https://github.com/Erdiko/authorize)
  * [Users](https://github.com/Erdiko/users)
* Copy the `composer-dev.json` file to `composer.json`
* Start your docker container `docker-composer up --build`


Special Thanks
--------------

Arroyo Labs - For sponsoring development, [http://arroyolabs.com](http://arroyolabs.com)
