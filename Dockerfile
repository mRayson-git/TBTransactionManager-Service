FROM node:15

WORKDIR /code

ADD . /code

RUN npm install

EXPOSE 3000

CMD ["node", "app"]