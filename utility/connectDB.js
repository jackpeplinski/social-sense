const Sequelize = require("sequelize-cockroachdb");
// For secure connection to CockroachDB
const fs = require('fs');
 
module.exports = new Sequelize({
  dialect: "postgres",
  username: "joshrabovsky",
  password: "testtesttest",
  host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
  port: 26257,
  database: "hack-the-north-3552.defaultdb",
  dialectOptions: {
    ssl: {
      
      //For secure connection:
      ca: fs.readFileSync('./certs/root.crt')
              .toString()
    },
  },
  logging: false, 
});

