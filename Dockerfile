FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci

COPY src ./src

ENV NODE_ENV=production

EXPOSE 3000

USER node

CMD ["npm", "run", "start"]
