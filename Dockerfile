FROM node:18.18.0-alpine

COPY . /app_server

WORKDIR /app_server

RUN npm install 

CMD ["npm", "run", "start:dev"]