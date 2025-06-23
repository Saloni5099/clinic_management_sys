//To Retreive Single Token
const { Token } = require("../models/tokModel");
const { Doc } = require("../models/docModel");
const { Pats } = require("../models/patModel");

const retrieveSingleToken = async (req, res) => {
  try {
    if (req.body.id) {
      const tokenValue = parseInt(req.body.id);
      const result = await Token.aggregate([
        { $match: { "tokens.token": tokenValue } },
      ]);
      const results = result[0].tokens;
      let results1 = results.find(
        (data) => data.token === parseInt(req.body.id)
      );
      const docsDetails = await Doc.findById(results1.docs);
      const patientDetails = await Pats.findById(results1.patient);
      if (!docsDetails || !patientDetails) {
        return res
          .status(404)
          .json({ message: "Docs or Patient details not found" });
      }
      const prescriptions = patientDetails.docConsult.map(
        (entry) => entry.prescription
      );
      let doctorNames = [];
      await Pats.findById(patientDetails._id)
        .populate("docConsult.doctor")
        .exec()
        .then((patient) => {
          doctorNames = patient.docConsult.map(
            (consult) => consult.doctor.name
          );
        })
        .catch((err) => {
          console.error(err);
        });
      const combinedData = prescriptions.map((prescription, index) => ({
        prescription,
        doctorName: doctorNames[index],
      }));
      const responseData = {
        data: {
          token: results1.token,
          docs: {
            _id: docsDetails._id,
            name: docsDetails.name,
            age: docsDetails.age,
          },
          patient: {
            _id: patientDetails._id,
            name: patientDetails.name,
            age: patientDetails.age,
            phno: patientDetails.phno,
            combinedData,
          },
          createdAt: results1.createdAt,
        },
      };
      return res.status(200).json(responseData);
    } else if (req.body.patNo !== null) {
      const patientNumber = req.body.patNo;
      const patientDetails = await Pats.findOne({ phno: patientNumber });

      if (!patientDetails) {
        return res.status(404).json({ message: "Patient details not found" });
      }
      const result = await Token.aggregate([
        { $match: { "tokens.patient": patientDetails._id } },
      ]);

      if (!result || result.length === 0) {
        return res
          .status(404)
          .json({ message: "Token not found for the patient" });
      }

      const results1 = result[0].tokens[0]; // Assuming you want details from the first token

      const docsDetails = await Doc.findById(results1.docs);

      if (!docsDetails) {
        return res.status(404).json({ message: "Docs details not found" });
      }

      const prescriptions = patientDetails.docConsult.map(
        (entry) => entry.prescription
      );

      let doctorNames = [];
      await Pats.findById(patientDetails._id)
        .populate("docConsult.doctor")
        .exec()
        .then((patient) => {
          doctorNames = patient.docConsult.map(
            (consult) => consult.doctor.name
          );
        })
        .catch((err) => {
          console.error(err);
        });

      const combinedData = prescriptions.map((prescription, index) => ({
        prescription,
        doctorName: doctorNames[index],
      }));

      const responseData = {
        data: {
          token: results1.token,
          docs: {
            _id: docsDetails._id,
            name: docsDetails.name,
            age: docsDetails.age,
          },
          patient: {
            _id: patientDetails._id,
            name: patientDetails.name,
            age: patientDetails.age,
            phno: patientDetails.phno,
            combinedData,
          },
          createdAt: results1.createdAt,
        },
      };

      return res.status(200).json(responseData);
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error: " + err });
  }
};

module.exports = { retrieveSingleToken };
