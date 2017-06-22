#!/bin/sh

ls -al /code/vendor/erdiko

rm -rf /code/vendor/erdiko/users
cp /code/repos/users /code/vendor/erdiko/users

ls -al /code/vendor/erdiko/users

rm -rf /code/vendor/erdiko/authenticate
cp /code/repos/authenticate /code/vendor/erdiko/authenticate

ls -al /code/vendor/erdiko/authenticate

rm -rf /code/vendor/erdiko/authorize
cp /code/repos/authorize /code/vendor/erdiko/authorize

ls -al /code/vendor/erdiko/authenticate

ls -al /code/vendor/erdiko
