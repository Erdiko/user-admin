#!/bin/sh

# Add some color
GREEN='\033[0;32m'
RESET='\033[0m'

mysql -u root -ppsItPs16 -h db < /code/scripts/sql/create-db.sql
echo "${GREEN}Create database\n ${RESET}"

mysql -u root -ppsItPs16 -h db user-admin < /code/vendor/erdiko/users/sql/dumps/user-admin.sql
echo "${GREEN}update database schema\n ${RESET}"
