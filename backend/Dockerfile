FROM node:18 AS Development

ENV NODE_ENV=development

# Create app directory
WORKDIR /usr/src/server

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN npm install -g typescript

RUN pnpm install

COPY . .

CMD ["sh", "-c", "pnpm run dev && pnpm run watch"]

EXPOSE 5000
# CMD [ "node", "dist/index.js" ]
USER node