#!/bin/sh

rm /etc/nginx/conf.d/site.conf
rm /etc/nginx/fastcgi.conf

cp site.conf /etc/nginx/conf.d/site.conf
cp fastcgi.conf /etc/nginx/fastcgi.conf

echo "Done update nginx config"
