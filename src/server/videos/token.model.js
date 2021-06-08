const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tokensSchema = new Schema({
    nextPageToken: {
        type: String,
        unique: true 
    },
    length: {
        type: Number
    }
}, {timestamps: true })


const Token = mongoose.model('Token', tokensSchema)
module.exports = Token;
