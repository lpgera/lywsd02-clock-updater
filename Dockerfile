FROM node:25.2.1 AS dependencies

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --omit=dev

FROM node:25.2.1-slim

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app ./

COPY . .

CMD ["node", "--run", "start"]
