const express=require("express")
const sequelize = require("./config/db");


const app=express()

sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("connected to the server");
  });
});
