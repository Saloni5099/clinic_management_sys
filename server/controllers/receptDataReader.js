//Will Get The Deatils of All the Doctor,Patients Consultants

const { Recept } = require("../models/receptModel");

const receptDataReader = async (req, res) => {
    try {
        const recept = await Recept.findById(req.body.id)
            .populate({
                path: 'doctor.docObjectId',
                model: 'Doc',
            })
            .populate({
                path: 'doctor.patId',
                model: 'Pats',
            });
        if (!recept) return res.status(200).json({ data: "No data" });
        console.log(recept);
        return res.status(200).json({ data: recept });
    } catch (error) {
        // console.log("hi");
        return res.status(500).json("Retrieve Error " + error);
    }
};

module.exports = { receptDataReader };
