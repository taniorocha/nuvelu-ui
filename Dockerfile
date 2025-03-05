FROM node:14-alpine AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine-slim

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html