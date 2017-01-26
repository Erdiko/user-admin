User Admin
==========

[![Package version](https://img.shields.io/packagist/v/erdiko/user-admin.svg?style=flat-square)](https://packagist.org/packages/erdiko/user-admin)

Goal: A fully functional and modular user management system with an Angular 2 UX.

* This is an active development project and not quite ready for production yet

It is based on a few erdiko packages (authorize, authenticate, and users) as well as the [Angular CLI](https://github.com/angular/angular-cli) project.

Angular Application
-------------------

The UX is an Angular CLI project using a simple erdiko application to load and bootrap. The basic Erdiko routing loads and starts the Angular 2 application as are the AJAX routes.

We chose to use Angular CLI since it makes it very simple to create new components as well as creating basic unit and functional tests for the developer. We also wanted to provide a method to allow the user to easily test their code as they developed yet still compile and serve the smallest code when serving to the end user.

Installation
------------

#### Create your project using composer:

`composer create erdiko/user-admin [PROJECT NAME]`

###### NOTE - Minimum Stability

Please note that at this time, you may need to set the minimum stability to "DEV" until we finalize our stable release. Simply add this flag to the command string above.

` --stability DEV`

#### Enter the newly created project directory

`cd [PROJECT NAME]`

#### Start your docker container

`docker compose up -d`

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

Special Thanks
--------------

Arroyo Labs - For sponsoring development, [http://arroyolabs.com](http://arroyolabs.com)
