#!/bin/sh

echo "Try to query @ 172.17.0.1"
mysql -u root -ppsItPs16 -h 172.17.0.1 -P 3301 -e 'show tables' user-admin 
