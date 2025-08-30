FROM node:24.7.0 AS dependencies

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --omit=dev

FROM node:24.7.0-slim

WORKDIR /usr/src/app

COPY --from=dependencies /usr/src/app ./

COPY . .

CMD ["node", "--run", "start"]
