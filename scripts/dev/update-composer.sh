#!/bin/sh

# cd to the script folder (so that the script can be ran anywhere)
# DIR=$(cd $(dirname ${BASH_SOURCE[0]}); pwd)
# cd $DIR

# Update composer packages
cd /code
composer update
