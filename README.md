# iBlog API

An API server built on Express.js framework in Node.js and MySQL database for iBlog. Use passport-jwt to authenticate.

Click [this link](https://limecorner.github.io/blog-page). Use following email and password to login in and explore all features.

Email | Password | UserName | Permission
--- | --- | --- | ---
blue@gmail.com | 123 | 藍秋 | login


## Getting Start

### **Environment Setup**

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/download/)
* [MySQL](https://dev.mysql.com/downloads/mysql/)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)

### **Installation**

**Be sure to meet above environment setup requirement.**

1. Clone this project to local

```
$ git clone https://github.com/limecorner/blog-backend.git
```

2. Change directory

```
$ cd blog-backend
```

3. Install all dependencies

```
$ npm install
```

### **Configuration**

**.env file**

Please create `.env` to set environment variable.

```
JWT_SECRET=
```

**config/config.json**

Finish database connection setting in `config/config.json` for development environment.

```
{
  "development": {
    "username": "root",
    "password": "<your_password>",
    "database": "blog",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
}
```

**Create database**

In MySQL Workbench, create development database by entering following SQL command.

```
drop database if exists blog; 
create database blog;
```

**Database migration**

Using Sequelize command, create tables through migration files in development environment.

```
$ npx sequelize db:migrate
```

### **Usage**

**Create seed data**

Using Sequelize command to establish seed data in development environment.

```
$ npx sequelize db:seed:all
```

**Start server**

Run server on localhost. If successful, `App is running on http://localhost:3000` will show in terminal.

```
$ npm run start
```

If you have installed [nodemon](https://www.npmjs.com/package/nodemon), you can use this command.

```
$ npm run dev
```

**Stop server**

Pressing Ctrl + C to stop server running.

## Contributor
* [李建賦](https://github.com/limecorner)
