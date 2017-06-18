############################################################
# Node container for AngularX and SASS development
############################################################

# Set the base image to Node
FROM node:6.10

# File Author / Maintainer
MAINTAINER John Arroyo, john@arroyolabs.com

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get upgrade -y

# Install NPM
RUN npm install npm

# Install ngx-cli
RUN npm install -g @angular/cli && apt-get clean
