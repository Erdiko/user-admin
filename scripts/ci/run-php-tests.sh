#!/bin/sh

# Add some color
GREEN='\033[0;32m'
RESET='\033[0m'

#DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
#cd $DIR

# Run unit tests for user-admin (inside of docker)
/code/scripts/ci/tests.sh
echo "${GREEN}ran unit test suite for user-admin package\n ${RESET}"

# Run unit tests for each sub package, 3 test suites (inside of docker)
/code/vendor/erdiko/users/scripts/ci-tests.sh
echo "${GREEN}ran unit test suite for users package\n ${RESET}"

/code/vendor/erdiko/authorize/scripts/ci-tests.sh
echo "${GREEN}ran unit test suite for authorize package\n ${RESET}"

/code/vendor/erdiko/authenticate/scripts/ci-tests.sh
echo "${GREEN}ran unit test suite for authenticate package\n ${RESET}"
