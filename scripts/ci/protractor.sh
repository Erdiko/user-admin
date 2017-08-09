#!/bin/bash

cd /protactor/user-admin
xvfb-run -a --server-args="-screen 0 ${SCREEN_RES}" protractor $@
