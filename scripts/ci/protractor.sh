#!/bin/bash

cd /protractor/user-admin
xvfb-run -a --server-args="-screen 0 ${SCREEN_RES}" protractor $@
