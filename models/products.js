const mongoose = require('mongoose');
const { Schema } = mongoose

const productSchema = new Schema({
    nameItem : {
        type: String,
        require: [true, "Name of product belum dimasukkan"]
    },
    price : {
        type: Number,
        require: [true, "price belum dimasukkan"]
    },
    photo : {
        type: String,
        require: [false, "Foto belum dimasukkan"]
    }
})

const Products = mongoose.model('Products',productSchema);
module.exports = Products;


