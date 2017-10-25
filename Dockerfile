FROM node:7-alpine

RUN mkdir -p /application

WORKDIR /application

COPY package.json /application/package.json

RUN npm install

COPY . /application

EXPOSE 1337

CMD [ "npm", "start" ]
