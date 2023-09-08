const mongoose = require('mongoose')

const { Schema } = mongoose

const purchaseDetailSchema = new Schema({
    id_purchases: {
        type: mongoose.ObjectId,
        require: [true,"id_purchases wajib diisi"],
        ref:"purchases"
    },
    id_products: {
        type: mongoose.ObjectId,
        require: [true,"id_products wajib diisi"],
        ref:"Products"
    },
    quantity: {
        type: Number,
        require: [true,"quantity wajib diisi"]
    },
    item_price: {
        type: Number,
        require: [true,"item_price wajib diisi"]
    },
    total_price: {
        type: Number,
        require: [true,"total_price wajib diisi"]
    }
})

const Pur_detail = mongoose.model('purchases_detail',purchaseDetailSchema);
module.exports = Pur_detail;