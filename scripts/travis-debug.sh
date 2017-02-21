#!/bin/sh

echo "Try to query @ 172.17.0.1"
mysql -u root -ppsItPs16 -h 172.17.0.1 -P 3301 -e 'show tables;' user-admin 

echo "Try to query @ 172.18.0.2"
mysql -u root -ppsItPs16 -h 172.18.0.2 -P 3301 -e 'show tables;' user-admin 

echo "Try to query @ 172.18.0.3"
mysql -u root -ppsItPs16 -h 172.18.0.3 -P 3301 -e 'show tables;' user-admin 



#mysql -u root -ppsItPs16 -h erdiko_database -P 3301 -e 'show tables;' user-admin 
#mysql -u root -ppsItPs16 -h database -P 3301 -e 'show tables;' user-admin 
#mysql -u root -ppsItPs16 -h db -P 3301 -e 'show tables;' user-admin 
