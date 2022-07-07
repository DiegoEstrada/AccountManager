# AccountManager

This applicattion has the intention to allow people to handle their personal accounts. Offering a user control system based on roles that enables to a user has the control over the assets an liabilities that have.

## MVP 
For this `beta` version the following use cases are intented to achieve.

1. A user can log in the system and it display different sections based on the roles.
2. A user manage their accounts (assets and liabilities).
3. A user is able to do queryies for the accounts and details associated.
4. For each transaction, a user is able to perform `CRUD` operations, over the transacions.

>Note: For clarification, an **account** is considerated as any peopel or compani where the user is envolved due an amount of money. A **transaction** is each movement that the user do with that account. _i.e_ Pay bills, getting payd, etc.

## Tech Stack

### How to run this?

#### API.
Before to run the server, we need to have ready a [mongo server](https://www.mongodb.com/docs/manual/installation/) running on the default port.

After that, import the test data would be helpful using the [mongoimporter](https://www.mongodb.com/docs/database-tools/mongoimport/#examples) tool.

As a normal `node.js` project, inside of the `/api` folder the [package.json](./api/package.json) lives. There are different scripts to run the server. You can try.

```
$ npm install 
```
After installing the backend dependencies, you need to define the environment variables inside the `.env` file. [Here](https://github.com/DiegoEstrada/AccountManager/blob/develop/api/src/config/index.js) you can check what are the minimun variables that you need to define before to start the app.

Finally you can run any script defined, like 
```
$ npm run start 
```

#### Front-end
Once the micro service is up and running, the `React` app uses a proxy to connect with the api on the port `3000`. So, you can also run.
```
$ npm install
$ npm run start 
```

### Diagrams



