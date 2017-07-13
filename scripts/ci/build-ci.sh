#!/bin/sh

docker-compose -f docker-compose-ci.yml up -d

sleep 5

docker ps -a

# copy files to containers
docker cp ./ erdiko_users_php:/code
docker cp ./composer-dev.json erdiko_users_php:/code/composer.json
docker cp ./repos/authenticate erdiko_users_php:/authenticate
docker cp ./repos/authorize erdiko_users_php:/authorize
docker cp ./repos/users erdiko_users_php:/users

docker cp ./ erdiko_users_web:/code
docker cp ./repos/authenticate erdiko_users_web:/authenticate
docker cp ./repos/authorize erdiko_users_web:/authorize
docker cp ./repos/users erdiko_users_web:/users

docker exec -it erdiko_users_php /code/scripts/dev/update-composer.sh
docker exec -it erdiko_users_php /code/scripts/install-db.sh
