FROM node:20-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY package.json package-lock.json ./


RUN npm ci --include=dev
COPY . .

ARG TARGET_ENV=production
RUN cp .env.${TARGET_ENV} .env.production || true

RUN npm run build

FROM node:20-alpine
ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app
COPY --from=builder /app/server.js /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.env.production  /app

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
