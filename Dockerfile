FROM node:20.10.0 AS dependency

WORKDIR /app
COPY package.json .

# Remove yarn.lock if it exists, then install dependencies using Yarn
RUN rm -f yarn.lock \
    && yarn install

FROM node:20.10.0 AS builder
WORKDIR /app

# Copy node_modules from the dependency stage
COPY --from=dependency /app/node_modules ./node_modules

# Copy the rest of your app's source code
COPY . .

# Build your app using Yarn
RUN yarn build

# The command to start your app
CMD ["yarn", "start"]
