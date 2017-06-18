############################################################
# Node container for AngularX and SASS development
############################################################

# Set the base image to Node
FROM node:6.10

# File Author / Maintainer
MAINTAINER John Arroyo, john@arroyolabs.com

ENV DEBIAN_FRONTEND noninteractive

RUN mkdir -p /var/temp/npm \
    && cd /var/temp/npm \
    && npm install npm \
    && cd $(npm root -g) \
    && cd .. \
    && rm -rf node_modules \
    && mv /var/temp/npm/node_modules . \
    && rm -rf /var/temp/npm

# make sure we install the LATEST npm version
RUN cd ~ && npm install npm && rm -rf /usr/local/lib/node_modules && mv node_modules /usr/local/lib/

# install ngx-cli
RUN npm install -g @angular/cli
