#!/bin/sh

# Run unit tests for user-admin inside of docker
cd /code/tests/
phpunit AllTests
