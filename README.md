### First thing to know

Everything is created automatically on startup except:

- .env file variables in project's root directory, you set them yourself
- db contents in postgres and mongo, they are created as system is used

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
  "endOfLine": "crlf",
  "printWidth": 120
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
- it's kind of important to check input parameters are always defined or you might get compromised, in auth service this is done using UndefinedCheckPipe for each applicable controller input parameter, so this:

```
  @Post('/api/auth/setup-roles')
  async setupRoles(@Body() { role, description = '' }: { role: string; description: string }) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }
```

got replaced by this:

```
  @Post('/api/auth/setup-roles')
  async setupRoles(
    @Body('role', UndefinedCheckPipe) role: string,
    @Body() { description = '' }: { description: string },
  ) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }
```

in some other cases checking this has been moves deeper to service.

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
`docker-compose rm -svf db-psql; docker-compose up -d --build db-psql` \
`docker-compose rm -svf auth_and_permissions; docker-compose up -d --build auth_and_permissions` \
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

- for hot reload, you might also want to add this in nginx.conf for your frontend service (it enables WebSocket support):

```
  proxy_set_header Upgrade $http_upgrade;  # Enable WebSocket support (for hmr purpose only)
  proxy_set_header Connection "upgrade";  # Required for WebSocket (for hmr purpose only)
```

#### for prettier:

.prettierrc:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 120
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

#### some tech used in frontend

- Mui https://mui.com/material-ui/getting-started/installation/
- Mui icons https://fonts.google.com/icons?icon.set=Material+Icons

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
  - to be able to import everything unimported after 'ctrl + .' settings.json:
  ```json
  "typescript.suggest.autoImports": true,
  "javascript.suggest.autoImports": true
  ```

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

### RSA key for JWT issuing

- should be replaced every 1-2 years in .env, before it make backup, after it restart the system, and it will result in currently issued keys to loose validity, so if someone is logged in, they won't be able to do anything until they re-login
- I've used Windows Powershell 7 commands to generate them:

```
ssh-keygen -t rsa -b 4096 -f ./temp_key -N "" -m PEM
ssh-keygen -f ./temp_key -e -m PEM > ./temp_public_key.pem
Get-Content ./temp_key
Get-Content ./temp_public_key.pem
Remove-Item ./temp_key, ./temp_key.pub, ./temp_public_key.pem
```

and you still need to replace newlines in private key with \n, and then store both of them inside double quotes ("") as they contain spaces

### Naming conventions:

- database columns: snake_case
- ts variables: lowerCamelCase
- network endpoints urls: kebab-case
- ...more?
