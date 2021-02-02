const mongoose = require('mongoose');

const Movieschema = mongoose.Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true,

    },
    overview: {
        type: String,
        required: true,

    },
    vote_average: {
        type: Number,
        required: true,

    },


})

module.exports = Movie = mongoose.model('movie', Movieschema);

// title, poster_path, overview, vote_average