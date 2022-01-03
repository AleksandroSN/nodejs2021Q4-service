FROM node:16.13-alpine3.14

WORKDIR /home/docker

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE ${PORT}

CMD ["npm", "start"]