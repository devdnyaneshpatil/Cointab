const express = require("express");
const User = require("../models/user.model");
const userRouter = express.Router();

userRouter.get("/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(200).json({ msg: "Open" });
    } else {
      res.status(200).json({ msg: "Add" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

userRouter.post("/add", async (req, res) => {
  const { name, email, phone, website, city, company } = req.body;
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      phone: phone,
      website: website,
      city: city,
      company: company,
    });
    res.status(201).json({ msg: "Open", user: newUser });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = userRouter;
