const mongoose = require('mongoose');
const {
    DEV,
    SUCCESS_MESSAGES: { CONNECT_TO_DB },
    ERROR_MESSAGES: { DB_CONNECTION }
} = require('../../constants/commonConstants');

const env = process.env.NODE_ENV || DEV;

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log(CONNECT_TO_DB))
    .catch((err) => console.log(DB_CONNECTION, err));

// mongoose.set('strictQuery', true);
mongoose.set('debug', env === DEV);

module.exports = mongoose;