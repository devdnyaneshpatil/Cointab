const express = require("express");
const User = require("../models/user.model");
const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      res.status(200).json({ msg:"Open",user:user });
    } else {
      res.status(200).json({ msg:"Add" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

userRouter.post("/add", async (req, res) => {
  const { id,name, email, phone, website, city, company } = req.body;
  try {
    const newUser = await User.create({
      id:id,
      name: name,
      email: email,
      phone: phone,
      website: website,
      city: city,
      company: company,
    });
    res.status(201).json({ msg:"Open", user: newUser });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = userRouter;
