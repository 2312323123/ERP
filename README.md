### Configuring nest.js backend service:
I have @nestjs/cli installed globally.

#### creating a new Nest service
In the main project folder: \
`nest new --strict project-name --skip-git`

#### package.json
I like to add this command to "scripts" for dev purposes: \
`"start-fast": "nest start --watch -- -b swc",`

#### Hot reload:
We have already added --watch in package.json. \
One more thing is to add watchOptions to tsconfig.json on the same level as compilerOptions are:
``` json
  "watchOptions": {
    // Use a dynamic polling instead of system’s native events for file changes.
    "watchFile": "dynamicPriorityPolling",
    "watchDirectory": "dynamicPriorityPolling",
    "excludeDirectories": ["**/node_modules", "dist"]
  }
```

#### .prettierrc
to have CRLF as the default end of line ending on Windows add "endOfLine" prop:
``` json
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
Best to keep it uncommented only when using it.

---
#### some more standard steps:
* create database fields
* if module's controllers/providers need schema, import it like `imports: [TypeOrmModule.forFeature([<schema_name>])],`
* make sure setup-roles endpoint of auth service isn't publicly visible from time to time
* env variables should just work inside app if specified in docker-compose

---

#### Configuring Dockerfile and docker-compose.yml for the new service
- Remember to add new db info/actions to content of both db-psql-create_databases.sql and db-psql-init.sql of docker-compose.yml.
- Add that it depends_on database service, like:
```yml
  depends_on:
    - db-psql
```

#### Some useful Docker commands:
To completely remove and restart one service in running docker-compose (in this example nginx): \
`docker-compose rm -svf nginx; docker-compose up -d --build nginx` \
If you changed just ports: \
`docker-compose up -d`

#### Adding to nginx:
remember about `rewrite ^/<the_path>/?(.*)$ /$1 break;` part, it might be needed

#### Usage
entry point -> look at what port 80 of nginx is exposed to in the main docker-compose.yml
~~db admin panel -> /pgadmin~~ \
until it's fixed, pgadmin will be at http://149.156.119.173:5050/

---

### Frontend notes
* custom port and hot reload were set in /vite.config.ts, all it had before that was `plugins: [react()],`

#### .env notes
* be aware that when you deploy on different url, it has to be specified in one of the variables
* backend was done with npm, frontend with yarn, which sits on top of that
