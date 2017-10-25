FROM node

RUN npm install -g sails

RUN mkdir /application

WORKDIR /application

EXPOSE 1337

RUN npm install

CMD ["npm", "start" ]