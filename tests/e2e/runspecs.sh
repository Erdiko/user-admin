#!/usr/bin/env bash
clear;
#we need grab this value from docker container
baseURL="http://docker.local:8088"


    entry="node node_modules/jasmine-node/bin/jasmine-node --noStack --config baseURL $baseURL "

echo "Running all tests located in the e2e directory"
command=$entry"spec/"
echo $command
time $command #/nested/uber-nested
echo ""