const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,

        //match wit hthis string is used to check if its in the email format
    },
    password: {
        type: String,
        required: true,
    },

    image: {
        type: String
    },
    movies: [
        {
            movie: {
                //when we will create new movie we will have to push the movie id
                // so we need to push in to user.movies.push({movie: theMovieId})
                type: mongoose.Schema.Types.ObjectId,
                require: true,
                ref: 'movie'
            },

        }
    ]

})

module.exports = User = mongoose.model('user', UserSchema); 