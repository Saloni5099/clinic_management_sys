const bcrypt = require("bcrypt");
const { Recept } = require("../models/receptModel");
// const joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

const ReceptlogController = async (req, res) => {
  try {
    // console.log("hi");
    const user = await Recept.findOne({ email: req.body.email });
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

module.exports = { ReceptlogController };