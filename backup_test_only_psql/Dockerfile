FROM node:20 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
RUN groupadd -r myuser && useradd -r -g myuser myuser
CMD [ "npm", "run", "start:dev" ]


FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
ENV NODE_ENV=production
CMD ["node", "dist/main"] 