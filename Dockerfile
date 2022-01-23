FROM node:16.13-alpine3.14 as build

WORKDIR /usr/app

COPY package*.json .
RUN npm install --production && npm cache clean --force  

COPY . .

FROM node:16.13-alpine3.14 as production

COPY --from=build /usr/app/ /
EXPOSE ${PORT}