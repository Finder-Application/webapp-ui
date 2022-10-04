FROM node:16-alpine3.15

WORKDIR /app

COPY . .
RUN rm -rf node_modules
RUN yarn
RUN yarn add typescript
RUN yarn  build 

EXPOSE 3000
CMD ["yarn","preview"]

