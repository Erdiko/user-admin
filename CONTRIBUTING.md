Contributing to Erdiko User Admin
=================================

We welcome contributions and love to see folks get involved.  Below are some instructions to help get you going.


Setting up your development environment
---------------------------------------

*General*

The following will work on OS X and Linux, you may need to adjust accordingly if you are on a PC.  This checks out (git clone) all the erdiko repos

  git clone git@github.com:Erdiko/user-admin.git
  cd user-admin
  git checkout develop

  cd scripts/dev
  ./install-dev.sh

*Docker*

Start your containers.  It will set up an erdiko php/nginx environment as well as an Angular (node) container for making any changes to the JavaScript or CSS.

  cd ../../
  docker-compose -f docker-compose-dev.yml up &

*PHP*

Install composer packages and database

  docker exec -it erdiko_users_php /bin/bash
  cd /code
  composer update
  cd scripts
  ./install-db.sh

*Angular*

Set up to use the ngx-user-admin repo for local development using NPM link.

  docker exec -it erdiko_users_angular /bin/bash
  cd /code/scripts/dev
  ./link-npm.sh

you can now make changes in the ngx-user-admin repo and see those changes when you compile.  Use the instructions below to set up your Angular enviornment using NPM.  After your environment is set up you can rebuild Angular and the CSS by following the steps in the Compile section.  For additional information on our Angular code see the [NPM README](https://www.npmjs.com/package/@erdiko/ngx-user-admin) and the [repo README](https://github.com/Erdiko/ngx-user-admin).

Setup (first time):

  cd /code/app/themes/user-admin
  npm i

Compile:

  cd /code/app/themes/user-admin
  npm run build
