#!/bin/sh

mysql -u root -ppsItPs16 -h 172.17.0.1 -P 3301 -e 'SET GLOBAL wait_timeout = 36000;' user-admin
mysql -u root -ppsItPs16 -h 172.17.0.1 -P 3301 -e 'SET GLOBAL max_allowed_packet = 33554432;' user-admin 

echo "Try to query @ 172.17.0.1"
mysql -u root -ppsItPs16 -h 172.17.0.1 -P 3301 -e 'show tables;' user-admin 
