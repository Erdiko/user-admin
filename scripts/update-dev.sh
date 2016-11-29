#!/bin/sh

# @note must run this in the same folder as the script

# set branch and use everywhere
BRANCH="develop"

git checkout $BRANCH
git pull origin $BRANCH

cd ../../authenticate
git checkout $BRANCH
git pull origin $BRANCH

cd ../../authorize
git checkout $BRANCH
git pull origin $BRANCH

cd ../../users
git checkout $BRANCH
git pull origin $BRANCH
