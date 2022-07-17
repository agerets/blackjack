
# Use the official lightweight Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:17 as base

# Create and change to the app directory.
WORKDIR /usr/src/app

# TODO: add other args and envs
# Get build param
ARG NODE_ENV

# Set env var
ENV NODE_ENV=$NODE_ENV

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY package*.json ./

# Copy local code to the container image.
COPY . ./

# Install production dependencies.
RUN yarn

# Test an app before build
RUN yarn test

# Typescript application build
RUN yarn build

# Run the web service on container startup.
CMD [ "node", "dist/index.js" ]