#!/bin/sh

docker-compose -f docker-compose-ci.yml up -d

docker cp ./ erdiko_users_php:/code
docker cp ./ erdiko_users_web:/code

docker exec -it erdiko_users_php /code/scripts/ci/install.sh
