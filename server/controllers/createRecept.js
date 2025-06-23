const { Recept } = require("../models/receptModel");
const bcrypt = require('bcrypt');

const createRecept = async (req, res) => {
    try {
        const recept = await Recept.findOne({ phno: req.body.phno });
        if (recept) return res.status(409).json({ message: "Already Registered" });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const salt = await bcrypt.genSalt(process.env.SALT);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        // console.log("hello");
        await new Recept({ ...req.body, password: hashedPass }).save();
        res.status(200).json({ message: "Receptionist Account Created" });
    } catch (err) {
        return res.status(500).json({ message: "Server Error For Creating " + err })
    }
}

module.exports = { createRecept };