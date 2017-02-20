#!/bin/sh

echo "172.17.0.1"
mysql -u root -ppsItPs16 -h 172.17.0.1 -P 3301 -e 'show tables' user-admin 


echo "0.0.0.0"
mysql -u root -ppsItPs16 -h 0.0.0.0 -P 3301 -e 'show tables' user-admin 


echo "127.0.0.1"
mysql -u root -ppsItPs16 -h 127.0.0.1 -P 3301 -e 'show tables' user-admin 

echo "localhost"
mysql -u root -ppsItPs16 -h localhost -P 3301 -e 'show tables' user-admin 
