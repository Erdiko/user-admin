#!/bin/sh

# set branch and use everywhere
BRANCH="develop"

# cd to the script folder (so that the script can be ran anywhere)
DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
cd $DIR

# Add some color bling
GREEN='\033[0;32m'
RESET='\033[0m'

# Clone users
cd ../../
git clone git@github.com:Erdiko/users.git
cd ./users
git checkout $BRANCH
echo "${GREEN}users updated\n ${RESET}"

# Clone authenticate
cd ../
git clone git@github.com:Erdiko/authenticate.git
cd ./authenticate
git checkout $BRANCH
echo "${GREEN}authenticate updated\n ${RESET}"

# Clone authorize
cd ../
git clone git@github.com:Erdiko/authorize.git
cd ./authorize
git checkout $BRANCH
echo "${GREEN}authorize updated\n ${RESET}"
