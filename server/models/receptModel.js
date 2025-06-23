const mongoose = require("mongoose");
const receptSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phno: { type: Number, unique: true, required: true },
  gender: { type: String },
  exp: { type: Number },
  prevCompany: { type: String },
  doctor: [
    {
      docObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doc",
      },
      patId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pats",
      },
      amount: { type: String,required:true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Recept = mongoose.model("Recept", receptSchema);
module.exports = { Recept };
