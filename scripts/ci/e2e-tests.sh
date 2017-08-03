#!/bin/sh

# Run e2e tests for user-admin inside of docker
cd /code/app/themes/user-admin
docker run -it --privileged --rm --net=host -v /dev/shm:/dev/shm -v $(pwd):/protractor webnicer/protractor-headless 
