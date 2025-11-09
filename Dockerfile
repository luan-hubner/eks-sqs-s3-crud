FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/dist ./dist/src
COPY package*.json ./
RUN npm ci --omit=dev

EXPOSE 3333
CMD ["npm", "run", "start:prod"]
