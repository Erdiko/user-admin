User Admin
==========

Goal: A fully functional and modular user management system with an Angular 2 UX.

* This is an initial development project, do not use in production yet

It is based on a few erdiko packages (authorize, authenticate, and users) and the [Angular CLI](https://github.com/angular/angular-cli) project.

Angular Application
-------------------

The UX is an Angular CLI project using a simple erdiko application to load and bootrap. The basic Erdiko routing loads and starts the Angular 2 application as are the AJAX routes.

We chose to use Angular CLI since it makes it very simple to create new components as well as creating basic unit and functional tests for the developer. We also wanted to provide a method to allow the user to easily test their code as they developed yet still compile and serve the smallest code when serving to the end user.

Installation
------------

1. Get the code 

a) Clone repository
You can clone repository from github: 
`git clone https://github.com/Erdiko/user-admin.git`

b) Download ZIP file 
You can download as a `.zip` file and extract it.

2. Get dependencies

Again you have to alternatives to accomplish this steps:
a) You can run scripts under `scripts` folder.
 
b) You can clone the other three required repos from github one level up from your `user-admin` project folder:

b1) - `git clone https://github.com/Erdiko/users.git`

b2) - `git clone https://github.com/Erdiko/authenticate.git`

b2) - `git clone https://github.com/Erdiko/authorize.git`

3. Update Composer 
Just run `composer update` in your project folder in order to update links references in your vendor folder and 
autoloads.

How to Use
----------

First you will need to start the docker container running
`docker compose up -d`

In your browser go to `http://docker.local:8088/`    

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
