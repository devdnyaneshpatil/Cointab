const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.model");

const Post = sequelize.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: "id"
    },
  },
  title: DataTypes.STRING,
  body: DataTypes.STRING,
  company: DataTypes.STRING,
});

Post.belongsTo(User, { foreignKey: "userId" });

module.exports = Post;
