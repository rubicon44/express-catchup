FROM node:18.13.0-alpine

RUN apk update && \
    apk add --no-cache bash

RUN mkdir /express-catchup
ENV APP_ROOT /express-catchup
WORKDIR $APP_ROOT

RUN npm install -g express-generator

COPY package.json $APP_ROOT/package.json
COPY yarn.lock $APP_ROOT/yarn.lock

RUN yarn install

COPY . $APP_ROOT

EXPOSE 3000

CMD ["yarn", "start"]

# test
