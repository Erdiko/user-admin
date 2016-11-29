#!/bin/sh

# @note must run this in the same folder as the script

cd ../../authenticate
git checkout develop
git pull origin develop

cd ../../authorize
git checkout develop
git pull origin develop

cd ../../users
git checkout develop
git pull origin develop
