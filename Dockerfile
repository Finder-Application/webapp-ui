FROM node:16-alpine3.15

WORKDIR /app

COPY . .
RUN rm -rf node_modules
RUN yarn
RUN yarn  build 

EXPOSE 3000
CMD ["yarn","preview"]

