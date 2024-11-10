FROM node:16 AS development
WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
CMD [ "npm", "run", "dev" ]

FROM node:16 AS build
WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:16-alpine AS production
WORKDIR '/app'
COPY --from=build /app/dist ./dist
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --only=production --legacy-peer-deps
RUN npm install -g serve
CMD [ "serve", "-s", "dist", "-l", "8080" ]
