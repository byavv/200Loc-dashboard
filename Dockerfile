FROM node:6

# Maintainer
MAINTAINER Aksenchyk V. <aksenchyk.v@gmail.com>

# Define app directory
WORKDIR /usr/src/app

# Create app directory
RUN mkdir -p /usr/src/app

# Copy app sources
COPY . /usr/src/app

# Install dependencies and build client
RUN \ 
    npm install \   
    && npm run build

# Make server and client available
EXPOSE 5601

CMD [ "npm", "start"]
