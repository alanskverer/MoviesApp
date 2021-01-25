const mongoose = require('mongoose');
const dbString = "mongodb+srv://alanskverer:alanskverer@mernapp.mss9y.mongodb.net/MernApp?retryWrites=true&w=majority"

const connectDB = async () => {

    try {
        await mongoose.connect(dbString,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true
            });
        console.log('MongoDB Connected...')

    }
    catch (error) {
        console.error(error.message);
        //Exit proccest with failure
        process.exit(1);
    }
}
module.exports = connectDB;