
const express = require('express');
const router = express.Router();
const {
    getAllMovies
} = require('../../controllers/movieController')


// using the middleware
// router.use((req, res, next) => {
//     console.log('Someone entered to category route in time: ', Date.now());
//     next();
// });


// // using the middleware
// router.get('/:id', (req, res, next) => {
//     console.log('User ID used ' + req.params.id);
//     next();
// });

// router.get('/:id', (req, res) => {
//     res.send('User ' + req.params.id + ' entered the system');
// });

router.get('/', getAllMovies);
// router.get('/:id', getCategoryById);
// router.post('/', createcategory)
// router.patch('/:id', updateCategory)
// router.delete('/:id', deleteCategory)

module.exports = router;