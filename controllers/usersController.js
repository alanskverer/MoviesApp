const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');



module.exports = {
    getUser: async (req, res) => {
        try {
            let user = await User.findById(req.user.id).populate('movies.movie') // populate method lets us go
            // to movies table and take the movie from there 
            //in the User model we must have the movie model id as type: mongoose.Schema.Types.ObjectId
            // and with ref: 'tableName'

            return res.status(200).json({ user })

        } catch (error) {
            res.status(500).json({ msg: error.message })
        }


    },

    createUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // const { path: image } = req.file;
        // if I want to upload send a file should send in body 
        //as form-data and in the image key name call it image and in the headers content-type x-www-form-urlencoded
        const { name, email, password } = req.body;



        try {
            //Check if user exists

            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({ error })

                }


                user = new User(

                    {
                        _id: new mongoose.Types.ObjectId(),
                        name,
                        email,
                        password: hash,

                        // image: image.replace('\\', '/')
                    }
                )

                user.save().then((savedUser) => {


                    //i added this in order that after signing up the client will get the token
                    //we can either save the token and send it or we can just sign and then send it as a callback like down below
                    const payload = {
                        user: {
                            id: savedUser.id
                        }
                    }
                    jwt.sign(payload,
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1H"
                        }, (error, token) => {
                            if (error) {
                                throw err
                            }

                            return res.status(200).json({
                                msg: `User ${name} was saved to DB! with hash password and token`,
                                token
                            })

                        }
                    );
                });



            })



        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Server error")

        }

    },


    login: async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        //serching for user - getting back array with object
        let users = await User.find({ email });
        if (users.length === 0) {
            return res.status(401).json({ msg: 'Incorrect username or password' })
        }

        //pulling out the user from the users array
        const [user] = users

        // comapre user hash password - (realPassword, dbPassword, (error,result is ifThePasswordEqualsOrNot)=>{})
        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                return res.status(401).json({ msg: 'Incorrect username or password' })
            }

            if (result) {
                //This sign function takes 3 argunemts - 1. payload as object(what we want to send to the client)
                // 2.key (general password of my app)
                //3. object of options {}

                const payload = {
                    user: {
                        id: user._id
                    }
                }

                const token = jwt.sign(payload,
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1H"
                    }
                );

                return res.status(200).json({
                    msg: 'Auth successful',
                    token
                })


            }

            return res.status(401).json({ msg: 'Incorrect username or password' })

        })
    },


    addMovie: async (req, res) => {

        const { title, poster_path, overview, vote_average } = req.body;



        let movieFound = await Movie.findOne({ title: title });
        let user = await User.findById(req.user.id);


        if (movieFound) {

            try {
                user.movies.forEach(element => {
                    if (element.movie == movieFound.id) {

                        return res.status(200).json({ msg: "movie is in already in the watchlist", savedUser })
                    }
                });
                user.movies.unshift({ movie: movieFound.id });
                let savedUser = await user.save();
                return res.status(200).json({ msg: "movie is on db already! added movie to user list", savedUser })

            } catch (error) {
                return res.status(500).json({ msg: 'failed' })
            }

        }


        try {
            const newMovie = new Movie({

                title,
                poster_path,
                overview,
                vote_average

            })

            const movieSaved = await newMovie.save();
            user.movies.unshift({ movie: movieSaved.id });
            let savedUser = await user.save();

            return res.status(200).json({ msg: "added movie to db and to the user list", savedUser })

        } catch (error) {
            return res.status(500).json({ msg: 'failed' })


        }



    },

    removeMovie: async (req, res) => {

        const { title } = req.body;


        try {

            let movieToRemove = await Movie.findOne({ title: title });
            let user = await User.findById(req.user.id);


            const removeIndex = user.movies
                .map(movie => movie.movie.toString())
                .indexOf(movieToRemove.id)


            user.movies.splice(removeIndex, 1)

            let savedUser = await user.save();
            return res.status(200).json({ msg: "movie was deleted from user list", savedUser })

        } catch (error) {

            console.log(error.message)
            return res.status(500).json({ msg: 'failed' })
        }



    },

    getAllUserMovies: async (req, res) => {

        try {

            let user = await User.findById(req.user.id).populate('movies.movie');

            //   let userWithMovies = user.movies.populate('movies.movieId')
            return res.status(200).json({ msg: "user with populate moviesss", user })// savedUser)

        } catch (error) {
            return res.status(500).json({ msg: 'failed' })

        }


    },
    getAllMovies: async (req, res) => {

        try {

            let movies = await Movie.find();
            if (!movies) {
                return res.status(404).json({ msg: "No movies in db yet" })
            }

            //   let userWithMovies = user.movies.populate('movies.movieId')
            return res.status(200).json({ movies })// savedUser)

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ msg: 'failed' })

        }


    }



}
