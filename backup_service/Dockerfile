FROM node:20 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
# Install PostgreSQL client (for Debian-based images like node:20)
# only in this service as its purpose is to backup the database
RUN apt-get update && apt-get install -y wget gnupg2 \
    && echo "deb http://apt.postgresql.org/pub/repos/apt bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && wget -qO - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
    && apt-get update && apt-get install -y postgresql-client
# Add after installing PostgreSQL client
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && \
    apt-get install -y mongodb-database-tools

COPY . .
ENV NODE_ENV=development
# https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html
RUN groupadd -r myuser && useradd -r -g myuser myuser
ARG GIT_LOG
ARG GIT_REPO
ENV GIT_LOG=$GIT_LOG
ENV GIT_REPO=$GIT_REPO
# CMD echo "Development stage - Repository: $GIT_REPO" && echo "Git info:" && echo "$GIT_LOG"
CMD [ "npm", "run", "start-fast" ]



FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Install PostgreSQL client (for Debian-based images like node:20)
# only in this service as its purpose is to backup the database
RUN apt-get update && apt-get install -y postgresql-client
COPY . .
ARG GIT_LOG
ARG GIT_REPO
ENV GIT_LOG=$GIT_LOG
ENV GIT_REPO=$GIT_REPO
CMD echo "Build stage - Repository: $GIT_REPO" && echo "Git info:" && echo "$GIT_LOG"
RUN npm run build


FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
# Install PostgreSQL client (for Debian-based images like node:20)
# only in this service as its purpose is to backup the database
RUN apk add --no-cache postgresql-client
ENV NODE_ENV=production
ARG GIT_LOG
ARG GIT_REPO
ENV GIT_LOG=$GIT_LOG
ENV GIT_REPO=$GIT_REPO
# CMD echo "Production stage - Repository: $GIT_REPO" && echo "Git info:" && echo "$GIT_LOG"
CMD ["node", "dist/main"]
