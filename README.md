### Configuring nest.js backend service:

I have @nestjs/cli installed globally.

#### creating a new Nest service

In the main project folder: \
`nest new --strict project-name`
Then remove .git from newly created folder.

#### package.json

I like to add this command to "scripts" for dev purposes: \
`"start-fast": "nest start --watch -- -b swc",`

#### Hot reload:

We have already added --watch in package.json. \
One more thing is to add watchOptions to tsconfig.json at the same level as compilerOptions are:

```json
  "watchOptions": {
    // Use a dynamic polling instead of system’s native events for file changes.
    "watchFile": "dynamicPriorityPolling",
    "watchDirectory": "dynamicPriorityPolling",
    "excludeDirectories": ["**/node_modules", "dist"]
  }
```

#### .prettierrc

to have CRLF as the default end of line ending on Windows add "endOfLine" prop:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "endOfLine": "crlf"
}
```

#### enabling cors

You might need to do it for connection from frontend to work, it just needs `app.enableCors();` before listen(): \
https://docs.nestjs.com/security/cors

#### swagger (during development only!)

It may only be used during development, as it allows anyone to use your enpoints, which is bad. \
You can add it as described here: https://docs.nestjs.com/openapi/introduction \
Best to keep it uncommented only when using it. Library: `npm i @nestjs/swagger`

---

#### some more standard steps:

- install TypeORM and Postgres libraries: `npm i @nestjs/typeorm typeorm pg`
- create database fields
- if module's controllers/providers need schema, import it like `imports: [TypeOrmModule.forFeature([<schema_name>])],`
- make sure setup-roles endpoint of auth service isn't publicly visible from time to time
- you may also update what nginx depends_on in docker-compose.yml from time to time
- env variables should just work inside app if specified in docker-compose

---

#### Configuring Dockerfile and docker-compose.yml for the new service

docker-compose.yml:

- Add new db info/actions to content of both db-psql-create*databases.sql (take note that you have to paste db name and db user \_twice*)
- Add new db actions to db-psql-init.sql.
- Add that it depends_on database service, like:

```yml
depends_on:
  - db-psql
```

- When you copy docker-compose.yml service, pay attention to set correct stuff

Dockerfile:

- create Dockerfile in new microservice folder
- you probably can just copy some other working service Dockerfile contents

---

#### Some useful Docker commands:

To completely remove and restart one service in running docker-compose (in this example nginx): \
`docker-compose rm -svf nginx; docker-compose up -d --build nginx` \
If you changed just ports / or want to add newly created service to running docker compose: \
`docker-compose up -d`

#### Adding to nginx:

To make it work, you can copy the approach from other nest microservices in nginx.conf. \
In nginx.conf, each backend microservice has some /api/something/, that is redirected to it, and it has to implement /api/something/ as well.

#### Usage

entry point -> look at what port 80 of nginx is exposed to in the main docker-compose.yml
~~db admin panel -> /pgadmin~~ \
until it's fixed, pgadmin will be at http://149.156.119.173:5050/

---

### Frontend notes

In case you ever create frontend project here, here's what I did:

- `npm create vite@latest` -> \<name\> -> React -> TS + SWC
- custom port and hot reload were set in /vite.config.ts, all it had before that was `plugins: [react()],`

```ts
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
    host: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    // origin: "http://localhost:8080",
    watch: {
      usePolling: true,
    },
  },
});
```

#### for prettier:

.prettierrc:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

.prettierignore:

```
node_modules
dist
```

enter correct folder and npm install:

```
npm install --save-dev prettier
```

settings.json:

```json
  "editor.formatOnSave": true,
```

and additionally one of the following, or both if you're brave:

```json
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

```json
  "editor.defaultFormatter": "esbenp.prettier-vscode"
```

#### frontend Dockerfile

```
FROM node:16

# Set the working directory
WORKDIR '/app'

# Copy package.json and package-lock.json to the working directory
COPY ./package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start the React app
CMD [ "npm", "run", "dev" ]
```

#### one more frontend note

you may want to set up different Google clientId (here in main.tsx) in your frontend

---

### .env notes

- you need .env in the main ERP folder, like:
TODO: add stuff here
- be aware that when you deploy on different url, it has to be specified in one of the variables
- backend was done with npm, frontend with yarn, which sits on top of that

#### random helpful things:

- in VSCode, in changes view, if you select some changes and right-click, there is an option to stage just them
- some other libraries:
  - `npm i @nestjs/sequelize` `npm i --save-dev @types/sequelize` - if you use sequelize
  - `npm i pg-hstore` - gives option to store unstructured data in pgsql

### Google Cloud Console OAuth2 - how to

- you go to google cloud console
- new project (if don't have yet)
- left sidebar, API & Services -> Library
- enable chosen APIs (in our case Google Calendar API)
- APIs & Services -> Credentials ("Dane logowania")
- create credentials -> OAuth client ID
- -> web app
- set approved source URIs and redirect URI
- you get the keys
