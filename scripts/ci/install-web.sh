#!/bin/sh

rm /etc/nginx/conf.d/site.conf
rm /etc/nginx/fastcgi.conf

cp /code/docker/nginx/site.conf /etc/nginx/conf.d/site.conf
cp /code/docker/nginx/fastcgi.conf /etc/nginx/fastcgi.conf

echo "Done updating nginx config"
