const express=require("express")
const sequelize = require("./config/db");
const userRouter = require("./routes/user.routes");
const cors=require("cors");
const postRouter = require("./routes/post.routes");

const app=express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",postRouter)

sequelize.sync().then(() => {
  app.listen(8080, () => {
    console.log("connected to the server");
  });
});
