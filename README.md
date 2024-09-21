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

#### Configuring Dockerfile and docker-compose.yml for the new service

#### Some useful Docker commands:
To completely remove and restart one service in running docker-compose (in this example nginx): \
`docker-compose rm -svf nginx; docker-compose up -d --build nginx` \
If you changed just ports: \
`docker-compose up -d`

#### Adding to nginx:
remember about `rewrite ^/<the_path>/?(.*)$ /$1 break;` part, it might be needed

#### Usage
entry point -> look at what port 80 of nginx is exposed to in the main docker-compose.yml
db admin panel -> /pgadmin
