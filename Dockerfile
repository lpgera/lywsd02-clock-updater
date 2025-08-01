FROM node:24.4.1 AS dependencies

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

FROM node:24.4.1-alpine

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app ./

COPY . .

CMD ["node", "--run", "start"]
