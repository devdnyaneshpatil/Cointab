const sequelize=require("../config/db")
const { DataTypes } = require("sequelize")

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  website: DataTypes.STRING,
  city: DataTypes.STRING,
  company: DataTypes.STRING,
});

module.exports=User