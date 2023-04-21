
# module install
FROM node:16-alpine as module-install-stage
# set working directory
WORKDIR /app

COPY package.json yarn.lock ./

RUN apk add yarn
RUN yarn install

# build
FROM node:16-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN yarn build

# use this alpine base for mini size after build , because we only need static files 
FROM nginx:alpine
# Copy config nginx
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /app/dist .

