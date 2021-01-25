const mongoose = require('mongoose');

const Movieschema = mongoose.Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,

    },


})

module.exports = Movie = mongoose.model('movie', Movieschema); 