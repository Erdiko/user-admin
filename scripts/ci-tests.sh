#!/bin/sh

# Add some color
GREEN='\033[0;32m'
RESET='\033[0m'

# cd to the script folder (so that the script can be ran anywhere)
DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
cd $DIR

# Run unit tests inside of docker (3 test suites)
../vendor/erdiko/users/scripts/ci-tests.sh
echo "${GREEN}ran unit test suite for users package\n ${RESET}"

../vendor/erdiko/authorize/scripts/ci-tests.sh
echo "${GREEN}ran unit test suite for authorize package\n ${RESET}"

../vendor/erdiko/authenticate/scripts/ci-tests.sh
echo "${GREEN}ran unit test suite for authenticate package\n ${RESET}"
