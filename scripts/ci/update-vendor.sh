#!/bin/sh

rm -rf /code/vendor/erdiko/users
cp /code/repos/users /code/vendor/erdiko/users

rm -rf /code/vendor/erdiko/authenticate
cp /code/repos/users /code/vendor/erdiko/authenticate

rm -rf /code/vendor/erdiko/authorize
cp /code/repos/users /code/vendor/erdiko/authorize
