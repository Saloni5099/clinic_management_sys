//The Doctor Will Just Display The Details Of The Patient
//And Retrieve The Disease And Gives The Prescription

const { Doc } = require('../models/docModel');
const { Pats } = require('../models/patModel');
const mongoose = require('mongoose');

const enquirePatController = async (req, res) => {
    try {
        const doc = await Doc.findById(req.body.id);
        if (!doc) {
            return res.status(404).send({data:"Doctor Not Found"});
        }
        let prescription = req.body.pres;
        if (typeof prescription !== 'string') {
            return res.status(400).json({ error: 'Prescription must be a string' });
        }
        const docObjectId = new mongoose.Types.ObjectId(doc._id);
        const patDetail = await Pats.findOne({_id:req.body.patid})
        if (!doc.patConsult) {
            doc.patConsult = [];
        }
        if(patDetail){
            patDetail.docConsult.push({ doctor:docObjectId, prescription });
            await patDetail.save();
            doc.patConsult.push(patDetail.id);
        }
        else{
        const newPatient = await new Pats({
            name: req.body.name,
            age: req.body.patAge,
            gender: req.body.patGender,
            phno: req.body.patPh,
            docConsult: [{ doctor:docObjectId, prescription }],
        }).save();
        doc.patConsult.push(newPatient._id);
    }
        await doc.save();
        res.status(200).json({ message: 'Patient details added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error " + err.message);
    }
};

module.exports = { enquirePatController };
