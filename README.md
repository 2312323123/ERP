### Some common errors during development caused by how Nest.js works:

- using repository of another Table in different .service.ts
  - error: `Nest can't resolve dependencies of the RecruitmentsService (RecruitmentRepository, ActiveRecruitmentRepository, ?). Please make sure that the argument "MarkGradeNameRepository" at index [2] is available in the RecruitmentsModule context.`
  - if you do this:
    `@InjectRepository(MarkGradeName) private markGradeNameRepository: Repository<MarkGradeName>,` in `recruitments.service.ts`, you have to go to `recruitments.module.ts` and add `MarkGradeName` to the array here: `imports: [TypeOrmModule.forFeature([Recruitment, ActiveRecruitment])],` (MarkGradeName is an the Entity)
- importing other service:
  - error: `ERROR [ExceptionHandler] Nest can't resolve dependencies of the SurveysService (SurveyModel, ?). Please make sure that the argument MarksService at index [1] is available in the SurveysModule context.`
  - solution: add said service i.e. MarksService to providers[] of module for service in which you use it, i.e. SurveysModule
- fetching related tables by some i.e. OneToOne relation:
  - error: Cannot read properties of undefined (reading '<\some_field_name>\')
  - you need to add this in find to load related tables fields, example in getActiveRecruitmentNameUuid:
    relations: ['recruitment'], // Load the 'recruitment' relationship
- in case of some weird errors forcing you to import the Repositories the service you import uses, then the better procedure is to:
    - export service you import, and import the whole module with the service
    - so the rule of thumb could be `export services, import modules`


### First thing to know

To run this system:

Everything is created automatically on startup except:

- .env file variables in project's root directory, you set them yourself
- db contents in postgres and mongo db contents, they are created as system is used

Commands to run it:

- production: docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
- development: docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

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

```TS
  @Post('/api/auth/setup-roles')
  async setupRoles(@Body() { role, description = '' }: { role: string; description: string }) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }
```

got replaced by this:

```TS
  @Post('/api/auth/setup-roles')
  async setupRoles(
    @Body('role', UndefinedCheckPipe) role: string,
    @Body() { description = '' }: { description: string },
  ) {
    const createRoleDto = new CreateRoleDto(role, description);

    return await this.rolesService.create(createRoleDto);
  }
```

in some other cases checking this has been moved deeper to service.

- add authorisation guards:
  - in service's docker-compose: `- RSA_PUBLIC_KEY_FOR_JWT=${RSA_PUBLIC_KEY_FOR_JWT}`
  - in the service: `npm install @nestjs/jwt`
  - copy the whole `/src/auth` folder from i.e. recruitment_survey_phase
  - add new app.module.ts imports:

```TS
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
```

- add this to app.module.ts imports array:

```TS

    JwtModule.register({
      publicKey: process.env.RSA_PUBLIC_KEY_FOR_JWT, // your public RSA key
      signOptions: {
        algorithm: 'RS256', // use RS256 algorithm
      },
    }),
```

- add this to app.module.ts providers array:

```TS
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
```

- and then in controller you just import Roles from auth/roles.decorator and add the roles that can access given endpoint per endpoint like this:

```TS
  @Roles('SUPERADMIN')
  @Get('/api/surveys/admin-only')
  getAdminResource() {
    return { message: 'This is an admin-only resource' };
  }

  @Roles('USER', 'SUPERADMIN')
  @Get('/api/surveys/user-or-admin')
  getUserOrAdminResource() {
    return { message: 'This is accessible by user or admin' };
  }
```

and if there is no role required, then chances are some token is being sent as parameter - in such case please verify the token as soon as it enters the system, like was done in `logout` in app.controller.js of auth_and_permissions

- if the new microservice sets up some new roles:
  - go to its folder
  - `npm install @nestjs/axios`
  - `nest g s`
  - `init_roles`
  - then copy init roles contents from some other service, i.e. auth_and_permissions one
  - if it doesn't see nest/axios in here `import { HttpService } from '@nestjs/axios';`, then for me restarting IDE after trying everything else has helped
  - and also you have to put `HttpModule` from @nestjs/axios among app.module.ts imports array
- also important: using the guard injects a the new parameter `user_id` into the body of the request. It's already in auth folder you were recommended to copy, and you it in controller like `async getSmth(@UserId() userId: string) {}`
- to skip authorization: `@Roles('skip')`

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

- Similar in case you use mongo, add new user with their db and use that, and depends_on makes sense here, too. On Nest.js side, I've set up mongo using their docs: https://docs.nestjs.com/techniques/mongodb, and in docker-compose you can create new user with their database in configs part and then copy approach with env variables for username & password used in surveys microservice if you need mongo for whatever reason
- When you copy docker-compose.yml service, pay attention to set correct stuff

Dockerfile:

- create Dockerfile in new microservice folder
- you probably can just copy some other working service Dockerfile contents

---

#### Some useful Docker commands/info:

To completely remove and restart one service in running docker-compose (in this example nginx): \
old way: `docker-compose rm -svf frontend; docker-compose up -d --build frontend` \

new dev way (run from main folder): `docker-compose -f docker-compose.yml -f docker-compose.dev.yml rm -svf frontend; docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build frontend` \
hard resetting:
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml rm -svf db-psql; docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build db-psql` \
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml rm -svf frontend; docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build frontend` \
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml rm -svf recruitment_survey_phase; docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build recruitment_survey_phase` \

new prod way (run from main folder): `docker-compose -f docker-compose.yml -f docker-compose.prod.yml rm -svf frontend; docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build frontend`

If you changed just ports / or want to add newly created service to running docker compose: \
`docker-compose up -d`

##### docker-compose files division

There are three docker-dompose...yml files, because that's the way how I got development and production division to work.
If you want to not turn off some service, it's probably good to comment it out in both the one you're using and .dev. or .prod., respectively (maybe it would work without the .dev. / .prod. part, not checked).

#### Adding to nginx:

To make it work, you can copy the approach from other nest microservices in nginx.conf. \
In nginx.conf, each backend microservice has some /api/something/, that is redirected to it, and it has to implement /api/something/ as well.

#### Usage

entry point -> look at what port 80 of nginx is exposed to in the main docker-compose.yml \
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

#### some more frontend notes

- you may want to set up different Google clientId (here in main.tsx) in your frontend
- example slice to copy approach: surveySettingsPageSlice.tsx
- example network call to copy approach: // TODO: check if not outdated
  - GET: handleFetchActiveRecruitment
  - POST: erpAskForLogout, or handleClick in RoleButtonOwned.tsx,
  - POST with blocking buttons while fetching: acceptRequest in UserInfo.tsx
- how to show some message to user:
  - `const showSnackbar = useSnackbar()`, and then i.e.
    `showSnackbar('Zapisano zmiany!', 'success')` for success,
    `showSnackbar('An error occurred.', 'error')showSnackbar('An error occurred.', 'error')` for error
    there's also 'info' and 'warning'
    - the other way is `dispatch(setSnackbar({ message: \<message\>, severity \<severity\>}))`
  - the whole mutation action with snackbar may be isolated like in the case of useSaveRecruitmentSettings.ts, then all you do is call saveRecruitmentSettings()
  - appending of bearer tokens to api requests is done automatically by changing `baseQuery: fetchBaseQuery({ baseUrl: apiPathBase + '/' }),` to `baseQuery: baseQueryWithReauth,` in api definitions in services folder (and when you don't want to have it take effect in a particular endpoint, you put skipAuth in extraOptions, next to query, like this:
  ```TS
    baseQueryTestSkipAuth: builder.query<void, void>({
      query: () => 'api/surveys/all-recruitments-uuid-name-start-date',
      extraOptions: { skipAuth: true },
    }),
  ```
  )

#### some tech used in frontend

- Mui https://mui.com/material-ui/getting-started/installation/
- Mui icons https://fonts.google.com/icons?icon.set=Material+Icons
- normalize.css https://www.npmjs.com/package/normalize.css

---

### .env notes

- you need .env in the main ERP folder, like:
  TODO: add stuff here
- be aware that when you deploy on different url, it has to be specified in one of the variables
- backend was done with npm, frontend with yarn, which sits on top of that // TODO: check - you sure you hadn't moved to npm to keep this uniform?

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

### RTK Query accessing data in a nutshell:

- const [something, { isLoading, isSuccess, isError }] = useSomethingMutation()
- const { data: something, error, isLoading } = useSomeQuery()

### Running on server:

- alternative to git switch:
  `git fetch origin making-mongo-express-work:making-mongo-express-work`
  `git checkout making-mongo-express-work`
- when you move to server, you have to change apiPathBase in `frontend\src\config\constants.ts` from http://localhost:10016 to i.e. https://erp.best.krakow.pl (it is like that because I was too dumb to be able to use env variables in React)

### Nest cheat sheet:

- check if some data entry exists:

```TS
    // check if the recruitment exists
    const recruitmentToCopyFrom = await this.recruitmentRepository.findOne({
      where: { uuid },
    });

    if (!recruitmentToCopyFrom) {
      throw new NotFoundException('Recruitment not found');
    }
```

- generate CRUD component boilerplate (I've used this per-table): `nest g resource`, https://docs.nestjs.com/recipes/crud-generator
- generate service (used for services that were not included in the above): `nest g s`, https://docs.nestjs.com/cli/usages
