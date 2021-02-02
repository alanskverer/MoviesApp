const Movie = require('../models/movieModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');



module.exports = {
    getAllMovies: async (req, res) => {

        try {
            const movies = await Movie.find();

            return res.json(movies)


        } catch (error) {
            res.status(500).json({ msg: error.message })
        }




    },

    createMovie: async (req, res) => {
        const { title, description } = req.body;


        try {
            //Check if  exists

            let movie = await Movie.findOne({ title })

            if (movie) {

                return res.status(200).json({ msg: 'Movie already exists' })
            }

            category = new Category(
                {
                    _id: new mongoose.Types.ObjectId,
                    title,
                    description,

                }
            )
            await category.save();
            return res.status(200).json({
                msg: `Category ${title} was saved to DB!`
            })

        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Server error")

        }

    },


}