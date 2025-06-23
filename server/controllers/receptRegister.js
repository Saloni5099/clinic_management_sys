//To Create A Patient Record In Receipt DB

const { Pats } = require('../models/patModel');
const receptRegister = async (req, res) => {
    try {
        const patDetail = await Pats.findOne({ phno: req.body.patPh }) ? true : false;
        if(patDetail) return res.status(422).json("Patient is already Registered");
        const newPatient = await Pats.create({
            name:req.body.name,
            age:req.body.age,
            phno:req.body.phno,
            gender:req.body.gender,
            address:req.body.address
        });
        res.status(200).json({ message: 'Patient details added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error " + err.message);
    }
};

module.exports = { receptRegister };
