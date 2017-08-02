#!/bin/sh

# Add some color
GREEN='\033[0;32m'
RESET='\033[0m'

#DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
#cd $DIR

# Run e2e tests for user-admin
/code/scripts/ci/e2e-tests.sh
echo "${GREEN}ran e2e test suite for user-admin package\n ${RESET}"


