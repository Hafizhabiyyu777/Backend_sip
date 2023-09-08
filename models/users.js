const mongoose = require('mongoose')

const { Schema } = mongoose

const usersSchema = new Schema({
    username : {
        type: String,
        required: [true, 'username belum dimasukkan']
    },
    email : {
        type: String,
        required: [false,"email belum dimasukkan"],  
    },
    password : {
        type: String,
        required: [true,'Password belum dimasukkan'], 
    }
})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users
