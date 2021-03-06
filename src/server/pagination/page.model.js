const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    nextPageToken: {
        type: String,
        unique: true 
    },
    length: {
        type: Number
    }
}, {timestamps: true })


const PageSchema = mongoose.model('Page', pageSchema)
module.exports = PageSchema;
