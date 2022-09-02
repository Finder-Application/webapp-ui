FROM node:lastest

WORKDIR /app

COPY . .
RUN yarn install

RUN yarn build

EXPOSE 3000
CMD ["yarn", "preview"]