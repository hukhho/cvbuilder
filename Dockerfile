FROM node:20.10.0 AS dependency

WORKDIR /app
COPY package.json .

# Remove node_modules and yarn.lock, then use npm to install and update packages
RUN rm -rf node_modules yarn.lock \
    && npm install --frozen-lockfile \
    && npm update

FROM node:20.10.0 AS builder
WORKDIR /app

# Copy node_modules from the dependency stage
COPY --from=dependency /app/node_modules ./node_modules

# Copy the rest of your app's source code
COPY . .

# You can still run env here if you need to check environment variables
RUN env

# Build your app
RUN npm run build

# The command to start your app
CMD ["npm", "start"]
