//To add the Token Generation To The Collection
const { Token } = require("../models/tokModel");
const { Doc } = require("../models/docModel");
const { Pats } = require("../models/patModel");
const mongoose = require("mongoose");

const createToken = async (req, res) => {
  try {
    const docData = await Doc.findOne({ name: req.body.docname });
    const patData = await Pats.findOne({ phno: req.body.patNo });
    if(!docData) return res.status(404).send("Doctor Not Found");
    if(!patData) return res.status(404).send("Patient Not Found");
    const pipeline = [
      {
        $unwind: "$tokens",
      },
      {
        $group: {
          _id: null,
          maxToken: { $max: "$tokens.token" },
        },
      },
    ];
    const result = await Token.aggregate(pipeline);
    const newTokenValue = result.length > 0 ? result[0].maxToken + 1 : 1;
    const updatedToken = await Token.findOneAndUpdate(
      {},
      {
        $push: {
          tokens: {
            token: newTokenValue,
            docs: new mongoose.Types.ObjectId(docData._id),
            patient: new mongoose.Types.ObjectId(patData._id),
          },
        },
      },
      { new: true, upsert: true }
    );

    // Send the response after the token has been created
    res.status(200).json({ message: "Token Created", token: updatedToken,tokenID:newTokenValue });
  } catch (err) {
    // Send an error response if there's an error
    res.status(500).json({ message: "Server Error For Creating Token " + err });
  }
};

module.exports = { createToken };
