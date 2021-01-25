const Category = require('../models/categoryModel');
const mongoose = require('mongoose');
const User = require('../models/userModel');



module.exports = {
    getAllCategoeries: async (req, res) => {

        try {
            const user = await User.findById(req.user.id).select('-password');
            //res.json(user)

            let categories = await Category.find();
            res.status(200).json({ categories, user })

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
    createcategory: async (req, res) => {
        const { title, description } = req.body;


        try {
            //Check if  exists

            let category = await Category.findOne({ title })

            if (category) {
                return res.status(400).json({ errors: [{ msg: 'Category already exists' }] })
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