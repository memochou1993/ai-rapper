# build stage
FROM node:18 as builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

RUN rm -rf node_modules
RUN npm ci --only=production

# final stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "npm", "start" ]
