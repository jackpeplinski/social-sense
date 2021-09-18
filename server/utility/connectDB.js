const Sequelize = require("sequelize-cockroachdb");
// For secure connection to CockroachDB
const fs = require('fs');
 
module.exports = new Sequelize({
  dialect: "postgres",
  username: process.env.DB_username,
  password: process.env.DB_password,
  host: process.env.DB_host,
  port: process.env.DB_port,
  database: process.env.DB_database,
  dialectOptions: {
    ssl: {
      
      //For secure connection:
      ca: fs.readFileSync('./certs/root.crt')
              .toString()
    },
  },
  logging: false, 
});

