const Sequelize = require("sequelize-cockroachdb");
const sequelize = require('../utility/connectDB')

exports.Users = sequelize.define("users", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  group_id: {
    type: Sequelize.INTEGER
  },
  group_name: {
    type: Sequelize.TEXT
  },
  happy_count: {
    type: Sequelize.INTEGER
  },
  neutral_count: {
    type: Sequelize.INTEGER
  },
  sad_count: {
    type: Sequelize.INTEGER
  },
})

exports.Groups = sequelize.define("groups", {
  userID: {
    type: Sequelize.INTEGER,
  },
  groupID: {
    type: Sequelize.INTEGER,
  },
  groupName: {
    type: Sequelize.TEXT,
  },
  url: {
    type: Sequelize.TEXT,
  }
})

exports.Counts = sequelize.define("counts", {
  userID: {
    type: Sequelize.INTEGER,
  },
  groupID: {
    type: Sequelize.INTEGER,
  },
  happy: {
    type: Sequelize.INTEGER
  },
  neutral: {
    type: Sequelize.INTEGER
  },
  sad: {
    type: Sequelize.INTEGER
  },
})