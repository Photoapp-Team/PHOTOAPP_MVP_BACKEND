const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const connectDB = async () => {
    try{
        const connect= await mongoose.connect('mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}${DB_NAME}', {
            useNewUrlParser: true,
            useUnifiedTopoligy: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        connect.STATES.connected
        ? console.log('mongoDB Connected')
        : console.log('Error in MogoDB')

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDB};