#!/bin/sh

cd /ngx-user-admin
npm link
cd /code/user-admin/app/themes/user-admin/
npm link @erdiko/ngx-user-admin
