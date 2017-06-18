#!/bin/sh

# Meant to be ran in the user_admin_angular container

cd /ngx-user-admin
npm link
cd /code/user-admin/app/themes/user-admin/
npm link @erdiko/ngx-user-admin
