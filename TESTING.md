Testing
=======

##phpunit

Run all unit tests with the following commands.  Be sure you are running the full stack (docker-compose up) or the tests will fail since there is no database to connect to.

    docker-compose up &
    then
    docker exec -it erdiko_users_php /code/scripts/ci/run-php-tests.sh
    or
    docker-compose run php /code/scripts/ci/run-php-tests.sh

##misc ci notes
    docker exec -it erdiko_users_php /code/scripts/install-db.sh
    or
    docker-compose run php /code/scripts/install-db.sh
