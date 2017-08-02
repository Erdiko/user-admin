# User Admin

[![Package version](https://img.shields.io/packagist/v/erdiko/user-admin.svg?style=flat-square)](https://packagist.org/packages/erdiko/user-admin) [![CircleCI](https://img.shields.io/circleci/project/github/Erdiko/user-admin/develop.svg?style=flat-square)](https://circleci.com/gh/Erdiko/user-admin) [![license](https://img.shields.io/github/license/erdiko/user-admin.svg?style=flat-square)](https://github.com/Erdiko/user-admin/blob/master/LICENSE)

A fully functional and modular user management system with an Angular 2 UI and PHP backend.

It is based on a few erdiko packages (authorize, authenticate, and users) as well as the [Angular CLI](https://github.com/angular/angular-cli) project.

## Application

The UI is an Angular CLI project using an erdiko web application to interact with the database. Erdiko loads the Angular 2 application as well as serves the AJAX routes.

We chose to use Angular CLI since it makes it very simple to create new components as well as creating basic unit and functional tests for the developer. We also wanted to provide a method to allow the user to easily test their code as they developed yet still compile and serve the smallest code when serving to the end user.

## Installation

### Create your project using composer

```
composer create erdiko/user-admin [PROJECT NAME]
```

### Create your docker containers

Enter your newly created project directory and run docker compose.

```
cd [PROJECT NAME]
docker-compose up -d
```

If you don't have docker compose installed you can install by following the instructions here, [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).  You can, of course, just create create your own lamp stack if you wish.  If you create your own environment the webroot is /public/default/ and the database config is in /app/config/shared/database.json

### Install the users database

If you're running the docker container, installing the db is easy.  Just run the scripts/install-db.sh script from within your container.  An easy way to do this is to run.

```
docker exec -it erdiko_users_php /code/scripts/install-db.sh
```

If you are not using the docker script then simply restore the sql dump found in vendor/erdiko/users/sql/dumps/user-admin.sql.  Update app/config/shared/database.json with the connection information for your mysql server.

Check the users README if you need more information [https://github.com/Erdiko/users](https://github.com/Erdiko/users).

### View your new project in your browser

[http://erdiko.local/](http://erdiko.local/)

## Editing & Compiling the Angular Code

Editing and compiling the Angular code is simple, and we use Angular CLIs test server to allow you to edit your code and test in real time.

1. Go to the `user-admin` theme directory under `user-admin/app/themes/user-admin`
1. Install all dependencies via npm: `npm i`
1. Start the development server: `npm run start`
1. Edit the typescript found in the `src` directory and save in another terminal window or tab, watch for compiler errors

### NPM Run Commands

* Start the Development server: `npm run start`
* Run the unit tests: `npm run test`
* Run the e2e/functional tests: `npm run e2e`
* Compile and export files for end user: `npm run build`

## Contributing to Erdiko User Admin

To set up your environment for local development to contribute to the project please take a look at CONTRIBUTING.md.  That file has all the instructions on how to set up a development environment with Docker.  We've included some useful scripts in the scripts/dev folder to help.

## Special Thanks

Arroyo Labs - For sponsoring development, [http://arroyolabs.com](http://arroyolabs.com)
