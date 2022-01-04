FROM node:16.13-alpine3.14 as build

WORKDIR /usr/app

COPY package*.json .
RUN npm ci

COPY . .
# RUN npm run build && npm prune --production

# FROM node:16.13-alpine3.14 as production

# COPY --from=build /usr/app/ /
# EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]