# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download and Install Docker](https://www.docker.com/get-started)

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Docker

For use ready build

```
docker-compose pull node-app
docker-compose pull postgres
```

or new build

```
docker-compose build
```

For start container use

```
docker-compose up -d
```

For shutdown container use

```
docker-compose down
```

## PostgreSQL and pgAdmin

`DB` : fastify-db <br>
`Tables` :

- Users
- Tasks
- Boards

`Migrations` <br>

CLI migrations

```
npm run typeorm
```

For auto generate migrations

```
npm run typeorm:generate
```

If migrations changes

```
npm run typeorm:run
```

Docker-compose contains image dpage/pgadmin4 => [pgAdmin](https://www.pgadmin.org/). <br>
To access pgadmin from docker go to [http://localhost:5050](http://localhost:5050). <br>
email : `admin@admin.com` <br>
password: `root` <br>

To work with the program in docker, use the next flow:

1. Authorization
2. Add new server

   - Enter anything connection name
   - Host `postgres`
   - Username from .env file
   - Password from .env file

3. Browse servers

## Logger

For change level logs need go to env file and change

```
LOG_LEVEL
```

levels logs :

- 0: error
- 1: warn
- 2: info
- 3: debug
- 4: all

if level log === 0, all errors logs write in errorLog.txt

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
