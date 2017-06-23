#!/bin/sh

# Meant to be ran in the user_admin_angular container

cd /ngx-user-admin
npm link
cd /code/app/themes/user-admin/dist
npm link @erdiko/ngx-user-admin
