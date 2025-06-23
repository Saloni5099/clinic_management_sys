//Get The Details Of The Patients Where He Is Consulted With 
//This Doctor

const { Doc } = require('../models/docModel');

const docDataReader = async (req, res) => {
    try {
        const docs = await Doc.findById(req.body.id)
            .populate({
                path: 'patConsult',
                select: 'name age gender phno address', // Fields to include
                model: 'Pats'
            });
            // .populate({
            //     path: 'patConsult.patId',
            //     model: 'Pats',
            // });
            
            // .populate('patConsult', 'name age gender phno');
        // console.log(req.body.id);
        if (!docs) return res.status(200).json({ data: "No data" });

        console.log(docs);
        
        // const test = await Doc.findById("682f4695c0546189278be30a").populate('patConsult.patId');
        // console.log(test); // Should log patient data

        return res.status(200).json({ data: docs });
    } catch (error) {
        return res.status(500).json("Retrieve Error " + error);
    }
}

module.exports = { docDataReader };
