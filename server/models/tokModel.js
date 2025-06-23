const mongoose = require('mongoose');

const tokSchema = new mongoose.Schema({
    tokens: [
        {
            token: { type: Number, unique: true },
            docs: { type: mongoose.Schema.Types.ObjectId, ref: 'Doc', required: true },
            patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Pats', required: true },
            checked: { type: Boolean },
            createdAt: { type: Date, default: Date.now }
        }
    ],
}
)

const Token = mongoose.model("Token", tokSchema);
module.exports = { Token };