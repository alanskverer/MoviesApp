const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/user');
const movieRoutes = require('./routes/api/movie');

const checkAuth = require('./middelwares/checkAuth')


//Connect DB

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mernapp.mss9y.mongodb.net/MernApp?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
);

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected')
})


const app = express();

//Console log efter every request to the server using morgan
app.use(morgan('dev'));

//reach all static files 
app.use('/uploads', express.static('uploads'))


//Allow getting JSON obcjets from requst body
app.use(express.json({ extended: false }))


//Allow cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type, Authorization,Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



//Define routes
app.get('/', (req, res) => res.json({ msg: "hey there" }))
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);


//Page not found / no route 

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`))