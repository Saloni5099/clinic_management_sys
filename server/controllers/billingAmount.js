const { Doc } = require('../models/docModel');
const { Pats } = require('../models/patModel');
const { Recept } = require("../models/receptModel");

const billingAmount = async (req, res) => {
    try {
        const existingPatient = await Pats.findOne({ phno: req.body.patphno });
        if (!existingPatient) {
            return res.status(422).json("Patient is not registered");
        }

        const doc = await Doc.findOne({ name:req.body.name });
        if (!doc) {
            return res.status(422).json("Doctor is not registered");
        }

        const updatedReceipt = await Recept.findOneAndUpdate(
            { phno: req.body.phno },
            {
                $push: {
                    doctor: {
                        docObjectId: doc._id,
                        patId: existingPatient._id,
                        amount: req.body.amount,
                    }
                }
            },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Receipt updated successfully', receipt: updatedReceipt });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error " + err.message);
    }
};

module.exports = { billingAmount };
