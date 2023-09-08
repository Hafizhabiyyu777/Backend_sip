const mongoose = require('mongoose')
const { Schema } = mongoose

const purchasesSchema = new Schema({
    id_user: {
        type: mongoose.ObjectId,
        require: true,
        ref:"users"
    },
    Status: {
        type: String,
        require: [true,"Status wajib diisi"]
    },
    transaksi_date: {
        type: Date,
        require: [true,"Tanggal wajib diisi"]
    },
    total_checkout: {
        type: Number,
        require: [false,"Tanggal wajib diisi"]
    }

})

const Purchases = mongoose.model('purchases',purchasesSchema);
module.exports = Purchases