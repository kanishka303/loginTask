const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body, "body");
  const { fullName, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new User({ fullName, email, password });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    return res
      .status(500)
      .json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) {
    return res.status(200).send(req.body);
  } else {
    return res
      .status(500)
      .json({ error: "Cannot register" });
  }
});

module.exports = router;
