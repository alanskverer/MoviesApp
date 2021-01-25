const mongoose = require('mongoose');

const Categoryschema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },



})

module.exports = Category = mongoose.model('category', Categoryschema); 