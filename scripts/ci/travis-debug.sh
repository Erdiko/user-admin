#!/bin/sh

echo "Try to query @ erdiko_users_db"
mysql -u root -ppsItPs16 -h erdiko_users_db -e 'show tables;' user-admin

echo "Try to query @ erdiko_users_db:3301"
mysql -u root -ppsItPs16 -h erdiko_users_db -P 3301 -e 'show tables;' user-admin

echo "Try to query @ db"
mysql -u root -ppsItPs16 -h db -e 'show tables;' user-admin

echo "Try to query @ db:3301"
mysql -u root -ppsItPs16 -h db -P 3301 -e 'show tables;' user-admin


#mysql -u root -ppsItPs16 -h erdiko_database -P 3301 -e 'show tables;' user-admin 
#mysql -u root -ppsItPs16 -h database -P 3301 -e 'show tables;' user-admin 
#mysql -u root -ppsItPs16 -h db -P 3301 -e 'show tables;' user-admin 
