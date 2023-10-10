const mongoose = require('mongoose');
require('dotenv').config()

const DB = process.env.DATABASE;

const connection = () => {
    
    mongoose
        .connect(DB, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB connection successfully!'));
}

module.exports = connection