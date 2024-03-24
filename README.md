# Fincheck - Your personal financial application

## About

- [Preparing the environment](#install)
- [Running app in localhost](#localhost)

## 🧐 About

This project was made from the classes inside the [JStack](https://jstack.com.br/) course.

The application was made to be used as a financial controller of your finances, making it easy to make a balance of the income and outcomes of your accounts

Here, you can create bank accounts and activities where you money was destined to.

Recursos incluídos neste repositório:

- [Typescript](https://www.typescriptlang.org/): superset do JavaScript's superset with static typinc, completely optional, but recommended.

- [React](https://reactjs.org/): A library built with focus on building web interfaces from Javascript components.

## Installation <a name="install" />
You'll need to install nodeJS to run this applciation. Node is a cross-platform, open-source JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and etc. You can download the latest version on the [Offical Site](https://nodejs.org/en/download). It'as recommended to download the latest version maked as `LTS (Long Term Support)`.

After that, it will be required for you to have a database to keep al the data in memory. The easier way to make it is Using [Docker](https://docs.docker.com/get-docker/). Docker is a engine container that runs vrtual machines `(VMs)` from your computer kernel, making it easier to create and execute applications using containers. This assures you that the application running inside this isolated environment will not be affected by any version changes in your operational system, as well as making it easier to manage and scale these applications.

## Running app in localhost <a name="localhost" />
### Building Postgres database with Docker
After installing docker, open your terminal and type the docker command to check if docker was installed effectivelly.

Then, type the following command into the terminal:

> Here i'm defining the user and password as root and the port 5432 as the standard of postgres database, just to execute into the localhost. You can change it but don't forget to update the credentials in the `DATABASE_URL` environment variable in the `.env` inside the `api` folder.
#### Tags:
* `-e`: environment variables;
* `-d`: dettached mode, runs the docker container in background;
* `-p`: define the ports that the database is being exposed for your computer.
```bash
docker run -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -d postgres -p 5432:5432
```

To execute the frontend and API, open two separate terminals, get into `api`  and `frontend` folders in each one of them and execute the following commands:

### Executing API on development mode
```bash
cd api
```
#### Installing the dependencies
```bash
yarn
```
#### Executing database migrations with Prisma ORM
```bash
yarn prisma migrate dev
```
#### Running in dev mode
```bash
yarn start:dev
```
### Executing Frontend on development mode
```bash
cd frontend
```
#### Installing the dependencies
```bash
yarn
```
#### Running in dev mode
```bash
yarn dev
```
