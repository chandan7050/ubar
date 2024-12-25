const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.DB_URL, {})
       .then(() => console.log('Connected to MongoDB'))
       .catch(err => console.error('Failed to connect to MongoDB:', err))
}

module.exports = connectToDb;