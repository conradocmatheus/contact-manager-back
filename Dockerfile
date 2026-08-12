FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm ci --omit=dev

# npm is not required at runtime. Removing it reduces the final attack surface;
# Prisma and Node are invoked directly by the container command below.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

COPY src ./src

ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD node -e "fetch('http://localhost:3000/health').then(response => { if (!response.ok) process.exit(1) }).catch(() => process.exit(1))"

USER node

CMD ["sh", "-c", "./node_modules/.bin/prisma migrate deploy && exec node src/server.js"]
