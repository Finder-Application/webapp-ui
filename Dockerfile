FROM node:lts as development

WORKDIR /app

COPY package.json /app/package.json 
COPY yarn.lock  /app/yarn.lock

RUN yarn 

COPY . /app

ENV CI=true
ENV PORT=3000

FROM development AS build

RUN yarn build

CMD ["yarn","preview"]

# 2. For Nginx setup
FROM nginx:latest

# Copy config nginx
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
EXPOSE 3000