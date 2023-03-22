FROM node:18 AS Development

ENV NODE_ENV=development

# Create app directory
WORKDIR /usr/src/frontend

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN npm install -g typescript

RUN pnpm install

COPY . .

RUN pnpm dev

EXPOSE 5000

USER node