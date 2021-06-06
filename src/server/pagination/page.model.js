const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pageSchema = new Schema({
    nextPageToken: String,
}, { safe: true, timestamps: true })


const PageSchema = mongoose.model('Pagination', pageSchema)
module.exports = PageSchema;
