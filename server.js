const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/user');
const movieRoutes = require('./routes/api/movie');
const path = require('path');


// const connectDB = require('./config/db');



// const checkAuth = require('./middelwares/checkAuth')


const app = express();

//Connect DB
// connectDB();

// mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mernapp.mss9y.mongodb.net/MernApp?retryWrites=true&w=majority`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }
// );
mongoose.connect('mongodb+srv://alanskverer:alanskverer@mernapp.mss9y.mongodb.net/MernApp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
);

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connectedd')
})



//Console log efter every request to the server using morgan
// app.use(morgan('dev'));

//reach all static files 
// app.use('/uploads', express.static('uploads'))


//Allow getting JSON obcjets from requst body
app.use(express.json({ extended: false }))


//Allow cors
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type, Authorization,Accept');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



//Define routes
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server strated on port ${PORT}`))