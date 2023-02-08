# Express API Template

This is A Node js TypeScript Express framework backend with MongoDB as a database.

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environment.

### Node.js v16 or greater [Because of using [Modules: node:module API](https://nodejs.org/dist/latest-v16.x/docs/api/module.html)]

-   #### Node.js installation
    You can find more information about the installation on the [official Node.js website](https://nodejs.org/en/download/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.x.x

    $ npm --version
    8.x.x

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### MongoDB

The project uses MongoDB as a database.
Or install the Community Edition from https://www.mongodb.com/docs/manual/administration/install-community/

### Start the MongoDB server

TBA

## Project installation

    $ git clone https://github.com/mdskrumi/{project_name}.git
    $ cd {project_name}
    $ yarn install

## Configure app environment

Open `src/index.ts` then edit accordingly:

-   PORT: default as it is: 6600;
-   MONGO_PATH: default as it is mongodb://localhost:27017/{db_name};

You will also need to update environment properties type for validation at `src/utils/validateEnv.ts`

## Running the project

    $ NODE_ENV=stg yarn start

Available environments:

-   NODE_ENV=dev
-   NODE_ENV=stg
-   NODE_ENV=prod

## Development run with hot reload

    $ yarn dev

## Simple build for production

    $ yarn build

## Project structure

```sh

```
