const express=require("express")
const sequelize = require("./config/db");
const userRouter = require("./routes/user.routes");
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)

sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("connected to the server");
  });
});
