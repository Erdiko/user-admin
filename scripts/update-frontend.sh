#!/bin/sh

# This script will update your front-end js/css to the latest UI code

# cd to the script folder (so that the script can be ran anywhere)
DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
cd $DIR

# Add some color
GREEN='\033[0;32m'
RESET='\033[0m'

cd ../../app/themes/user-admin
npm i
npm run build

echo "${GREEN}Done with user admin front-end build\n ${RESET}"
