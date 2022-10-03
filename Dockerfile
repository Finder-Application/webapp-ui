FROM node:16-alpine3.15

WORKDIR /app

COPY . .
RUN yarn

RUN yarn  build

EXPOSE 3000
CMD ["yarn","preview"]