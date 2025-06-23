const mongoose = require('mongoose');
const docSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    // photo:{type:Buffer,default:"https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"},
    age: { type: Number, required: true },
    phno: { type: String, required: true,unique:true },
    gender: { type: String, required: true },
    exp: { type: Number },
    prevCompany: { type: String },
    patConsult: [
        {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Pats',
            patId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Pats",
            },
        }
    ]
})

const Doc = mongoose.model("Doc", docSchema);
module.exports = { Doc};