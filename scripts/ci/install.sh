#!/bin/sh

/code/scripts/ci/update-composer.sh

/code/scripts/ci/update-vendor.sh

/code/scripts/install-db.sh

# Hack for CI
mkdir /code/var
chmod -R 777 /code/var
