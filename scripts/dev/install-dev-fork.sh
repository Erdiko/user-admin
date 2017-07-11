#!/bin/sh

# Add some color bling
GREEN='\033[0;32m'
RESET='\033[0m'

if [ -z "$1" ]; then
    echo 'Please set your Github username of your fork';
    echo "For example your ${GREEN}Fork${RESET}: git@github.com:${GREEN}__GITHUB_USERNAME__${RESET}/user-admin.git"
    exit
fi

BRANCH="develop"
GITHUB_USERNAME=$1

exit

# cd to the script folder (so that the script can be ran anywhere)
if [ -z "$BASH_SOURCE" ]; then
   DIR=$(pwd)
else
   # cd to the script folder (so that the script can be ran anywhere)
   DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
fi

cd $DIR

# Pull user-admin
git checkout $BRANCH
git pull origin $BRANCH
echo "${GREEN}user-admin updated\n ${RESET}"

# Clone users
cd ../../../
git clone git@github.com:$GITHUB_USERNAME/users.git
cd ./users
git checkout $BRANCH
git remote add upstream git@github.com:Erdiko/users.git
echo "${GREEN}users updated\n ${RESET}"

# Clone authenticate
cd ../
git clone git@github.com:Erdiko/authenticate.git
cd ./authenticate
git checkout $BRANCH
git remote add upstream git@github.com:Erdiko/authenticate.git
echo "${GREEN}authenticate updated\n ${RESET}"

# Clone authorize
cd ../
git clone git@github.com:Erdiko/authorize.git
cd ./authorize
git checkout $BRANCH
git remote add upstream git@github.com:Erdiko/authorize.git
echo "${GREEN}authorize updated\n ${RESET}"

# Clone ngx-user-admin
cd ../
git clone git@github.com:$GITHUB_USERNAME/ngx-user-admin.git
cd ./ngx-user-admin
git checkout $BRANCH
git remote add upstream git@github.com:Erdiko/ngx-user-admin.git
echo "${GREEN}ngx-user-admin updated\n ${RESET}"