#!/bin/sh

# Add some color
GREEN='\033[0;32m'
RESET='\033[0m'

mysql -u root -ppsItPs16 -h db < /code/vendor/erdiko/users/sql/create-db.sql
echo "${GREEN}Create database\n ${RESET}"

mysql -u root -ppsItPs16 -h db users < /code/vendor/erdiko/users/sql/dumps/users.sql
echo "${GREEN}Restore users schema\n ${RESET}"

# execute the create-user script
php /code/vendor/erdiko/users/scripts/create-users.php -b=/code/app/bootstrap.php
