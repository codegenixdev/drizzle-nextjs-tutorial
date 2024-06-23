FROM node:21-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install --verbose

COPY . .

EXPOSE 3000

CMD npm run dev