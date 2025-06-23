const bcrypt = require("bcrypt");
const { Doc } = require("../models/docModel");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const DoclogController = async (req, res) => {
  try {
    const user = await Doc.findOne({ email: req.body.email });
    // console.log("hello");
    if (!user) {
      return res.status(401).json({ message: "Invalid User or Password" });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    res.status(200).json({ data: user, message: "Logged Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Login Error" });
  }
};
module.exports = { DoclogController };