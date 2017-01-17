User Admin
==========

Goal: A fully functional and modular user management system

* This is an initial development project, do not use in production yet

It is based on a few erdiko packages: authorize, authenticate, and users


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

b1 - `git clone https://github.com/Erdiko/users.git`
b2 - `git clone https://github.com/Erdiko/authenticate.git`
b2 - `git clone https://github.com/Erdiko/authorize.git`

3. Update Composer 
Just run `composer update` in your project folder in order to update links references in your vendor folder and 
autoloads.

How to Use
----------

First you will need to start the docker container running
`docker compose up -d`

In your browser go to `http://docker.local:8088/`    

Special Thanks
--------------

Arroyo Labs - For sponsoring development, [http://arroyolabs.com](http://arroyolabs.com)
