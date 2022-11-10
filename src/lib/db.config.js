const mongoose = require('mongoose');

const connectDB = async () => {
    try{
     
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
