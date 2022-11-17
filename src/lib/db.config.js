const mongoose = require('mongoose');
const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const connectDB = async () => {
    try{
        const connect= await mongoose.connect('mongodb://mongodb+srv://photoapp:46yhDtgU1pBtcF7Y@cluster0.8e0dxxy.mongodb.net/photoapp-backend/mhcode_db', {
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
