
const express = require('express');
const router = express.Router();

const upload = require('../../middelwares/upload')
const checkAuth = require('../../middelwares/checkAuth')

const { body, validationResult } = require('express-validator');

const {
    getAllUsers,
    createUser,
    login,
    addMovie,
    removeMovie,
    getAllUserMovies,
    getAllMovies
} = require('../../controllers/usersController')


// using the middleware
router.use((req, res, next) => {
    console.log('Someone entered to users route in time: ', Date.now());
    next();
});

router.get('/', getAllUsers);

//users/addmovie
router.post('/addmovie', checkAuth, addMovie);
router.get('/getusermovies', checkAuth, getAllUserMovies);
router.get('/getallmovies', getAllMovies);
router.delete('/removemovie', checkAuth, removeMovie);

router.post('/login', login);
router.post('/',
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }), createUser)


module.exports = router;