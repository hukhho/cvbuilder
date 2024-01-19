FROM node:20.10.0 AS dependency

WORKDIR /app
COPY package.json .
RUN yarn install --frozen-lockfile

FROM node:20.10.0 AS builder
WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .
RUN env
RUN yarn build

CMD [ "yarn","start" ]