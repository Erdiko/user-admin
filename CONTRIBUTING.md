# Contributing to Erdiko User Admin

We welcome contributions and love to see folks get involved.  Below are instructions to help you get going.

## Setting up your development environment

### General

The following will work on OS X and Linux, you may need to adjust accordingly if you are on a PC.  This checks out (git clone) all the erdiko repos

    git clone git@github.com:Erdiko/user-admin.git
    cd user-admin/scripts/dev
    ./install-dev.sh

We have included a convenient script to update all of the git repos.  Use this whenever you want to pull the latest from ALL the repos.  You don't need to run it right now.

    ./update-dev.sh

### Docker

Start your containers.  This will set up an erdiko LEMP stack as well as an Angular (node) container for making any changes to the JavaScript or CSS.

    cd ../../
    docker-compose -f docker-compose-dev.yml up &

### PHP

Install composer packages and database

    docker exec -it erdiko_users_php /code/scripts/dev/update-composer.sh
    docker exec -it erdiko_users_php /code/scripts/install-db.sh

Your environment is ready to go.  Now create an entry in your etc hosts file for your new domain, http://erdiko.local/ and you're in business.

To login use the following credentials.

user: erdiko@arroyolabs.com
pass: password

After you login, click around and try to figure out how to update your password.

### Running unit tests

To run phpunit tests for all repos there is a convenience script.  Get in the habit of running this before pushing your commits or making a pull request.

    docker exec -it erdiko_users_php /code/scripts/ci/run-php-tests.sh
    *or*
    docker-compose -f docker-compose-ci.yml run php /code/scripts/ci/run-php-tests.sh

### Angular

Set up to use the ngx-user-admin repo for local development using NPM link.  

    docker exec -it erdiko_users_angular /code/scripts/dev/link-npm.sh

you can now make changes in the ngx-user-admin repo and see those changes when you compile.  Use the instructions below to set up your Angular enviornment using NPM.  After your environment is set up you can rebuild Angular and the CSS by following the steps in the Compile section.  For additional information on our Angular code see the [NPM README](https://www.npmjs.com/package/@erdiko/ngx-user-admin) and the [repo README](https://github.com/Erdiko/ngx-user-admin).

#### Setup (first time)

    docker exec -it erdiko_users_angular /bin/bash
    /code/scripts/dev/link-npm.sh
    cd /code/app/themes/user-admin
    npm i

#### Compile

    docker exec -it erdiko_users_angular /bin/bash
    cd /code/app/themes/user-admin
    npm run build

or you can this from the host

    docker exec -it erdiko_users_angular /code/scripts/dev/run-build.sh

Using the Angular dev server

    docker exec -it erdiko_users_angular /bin/bash
    cd /code/app/themes/user-admin
    npm run start

#### Rebuilding your Docker containers

If you rebuild your containers (or run docker-compose down) then some of your initial set up is still good (persistent) but some of your environment resets.  For the PHP development there will be no impact since your database stays intact after deleting your containers.  For JavaScript / Angular development, however, you will have to do some basic initialization to get back to where you left off.

    docker exec -it erdiko_users_angular /code/scripts/dev/link-npm.sh

Now you can compile your Angular and Sass code again.

    docker exec -it erdiko_users_angular /code/scripts/dev/run-build.sh
