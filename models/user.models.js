const Sequelize = require("sequelize-cockroachdb");
const sequelize = require('../utility/connectDB')

exports.Users = sequelize.define("users", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  group_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  group_name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  happy_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  neutral_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sad_count: {
    type: Sequelize.INTEGER,
    allowNull: false
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