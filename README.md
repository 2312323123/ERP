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

#### Configuring Dockerfile and docker-compose.yml for the new service