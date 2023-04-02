FROM node:18 AS Development

ENV NODE_ENV=development

# Create app directory
WORKDIR /usr/src/frontend

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN npm install -g --unsafe-perm=true --allow-root
# RUN npm install -g typescript

RUN pnpm config set unsafe-perm true

RUN pnpm install

COPY . .

CMD ["sh", "-c", "pnpm run dev"]

EXPOSE 5000

USER node