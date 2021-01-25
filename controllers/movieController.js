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
    getCategoryById: async (req, res) => {

        try {

            let category = await User.findById(req.params.id)
            res.status(200).json({
                category
            })
        } catch (error) {
            return res.status(500).json({ msg: "Category not found" })
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
    updateCategory: async (req, res) => {

        try {
            await Category.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json({ msg: "Category updated" })


        } catch (error) {
            return res.status(500).json(error.message)
        }

    },
    deleteCategory: async (req, res) => {

        try {
            await Category.deleteOne({ _id: req.params.id })
            res.status(200).json({ msg: "Category deleted" })


        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

}