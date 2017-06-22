#!/bin/sh

echo "/code/vendor/erdiko"
ls -al /code/vendor/erdiko

echo "/code/repos"
ls -al /code/repos

# Copy users package
rm -rf /code/vendor/erdiko/users
cp -R /code/repos/users /code/vendor/erdiko/users

ls -al /code/vendor/erdiko/users

# Copy authenticate package
rm -rf /code/vendor/erdiko/authenticate
cp -R /code/repos/authenticate /code/vendor/erdiko/authenticate

ls -al /code/vendor/erdiko/authenticate

# Copy authorize package
rm -rf /code/vendor/erdiko/authorize
cp -R /code/repos/authorize /code/vendor/erdiko/authorize

ls -al /code/vendor/erdiko/authorize

echo "/code/vendor/erdiko"
ls -al /code/vendor/erdiko
