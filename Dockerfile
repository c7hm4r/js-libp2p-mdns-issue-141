FROM node:18.10.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "run", "demo"]
