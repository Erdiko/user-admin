#!/bin/sh

# set branch and use everywhere
BRANCH="develop"

# cd to the script folder (so that the script can be ran anywhere)
if [ -z "$BASH_SOURCE" ]; then
   DIR=$(pwd)
else
   # cd to the script folder (so that the script can be ran anywhere)
   DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
fi
cd $DIR

# Add some color bling
GREEN='\033[0;32m'
RESET='\033[0m'

# Pull user-admin
git checkout $BRANCH
git pull upstream $BRANCH
echo "${GREEN}user-admin updated\n ${RESET}"

# Pull users
cd ../../../users
git checkout $BRANCH
git pull upstream $BRANCH
echo "${GREEN}users updated\n ${RESET}"

# Pull authenticate
cd ../authenticate
git checkout $BRANCH
git pull upstream $BRANCH
echo "${GREEN}authenticate updated\n ${RESET}"

# Pull authorize
cd ../authorize
git checkout $BRANCH
git pull upstream $BRANCH
echo "${GREEN}authorize updated\n ${RESET}"

# Pull ngx-user-admin
cd ../ngx-user-admin
git checkout $BRANCH
git pull upstream $BRANCH
echo "${GREEN}ngx-user-admin updated\n ${RESET}"
