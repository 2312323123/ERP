FROM node:18 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
# https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html
RUN groupadd -r myuser && useradd -r -g myuser myuser
CMD [ "npm", "run", "start-fast" ]


FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:18-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
ENV NODE_ENV=production
CMD ["node", "dist/main"]
