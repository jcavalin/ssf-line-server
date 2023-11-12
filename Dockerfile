FROM node:21.1.0-bullseye

WORKDIR /usr/app

COPY . .
RUN npm install

CMD [ "npm", "run", "start" ]