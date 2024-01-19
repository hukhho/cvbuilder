# Stage 1: Install dependencies
FROM node:20.10.0 AS dependency

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage 2: Build the application
FROM node:20.10.0 AS builder

WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Stage 3: Final image
FROM node:20.10.0

WORKDIR /app
COPY --from=builder /app/dist ./dist

CMD ["yarn", "start"]
