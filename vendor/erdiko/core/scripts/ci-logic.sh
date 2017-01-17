#!/bin/sh

set -e

# Run phpunit tests in relevant container(s)

# If release branch do a full regression against php versions
# @note perhaps we should do this for master as well
if [ "$TRAVIS_BRANCH" == "release" ]; then
    
    sudo docker-compose -f docker-compose.travis.yml up -d
    sudo docker exec erdiko_phpfpm_7.1 /code/vendor/erdiko/core/scripts/ci-tests.sh
    sudo docker exec erdiko_phpfpm_7.0 /code/vendor/erdiko/core/scripts/ci-tests.sh
    sudo docker exec erdiko_phpfpm_5.6 /code/vendor/erdiko/core/scripts/ci-tests.sh
    sudo docker exec erdiko_phpfpm_5.5 /code/vendor/erdiko/core/scripts/ci-tests.sh
    sudo docker exec erdiko_phpfpm_5.4 /code/vendor/erdiko/core/scripts/ci-tests.sh

# Else run the current branch's tests against the offical erdiko_php image
else

	sudo docker-compose up -d
    sudo docker exec erdiko_php /code/vendor/erdiko/core/scripts/ci-tests.sh

fi