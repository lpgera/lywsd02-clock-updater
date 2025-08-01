FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

COPY . .

CMD ["node", "--run", "start"]
