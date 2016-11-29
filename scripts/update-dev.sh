#!/bin/sh

# set branch and use everywhere
BRANCH="develop"

# cd to the script folder (so that the script can be ran anywhere)
DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
cd $DIR

# Pull user-admin
git checkout $BRANCH
git pull origin $BRANCH

# Pull authenticate
cd ../../authenticate
git checkout $BRANCH
git pull origin $BRANCH

# Pull authorize
cd ../authorize
git checkout $BRANCH
git pull origin $BRANCH

# Pull users
cd ../users
git checkout $BRANCH
git pull origin $BRANCH
