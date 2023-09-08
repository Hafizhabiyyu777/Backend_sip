const Purchases = require("../models/purchases");
const Pur_detail = require("../models/purchase_detail");
const Users = require("../models/users");


module.exports = {
    checkOut : async (req,res) => {
        try{
        if(!await Users.findById(req.body.id_user)) {
            return res.status(404).json ({
                Status : 404,
                Message : "user tidak ditemukan"
            })
        }
        const data = {
            id_user:req.body.id_user,
            Status: 'Pending',
            transaksi_date: new Date(),
            total_checkout: 1
        };
        const newPurchase = await Purchases.create(data);
        const items = req.body.items;
        const purchaseItems = [];
        let total_checkout=1;
        for (const item of items) {
            const purchaseItem = new Pur_detail({
                id_purchases: newPurchase._id,
                id_products: item.id_products,
                quantity: item.quantity,
                item_price: item.item_price,
                total_price: item.quantity * item.item_price,
            });
            total_checkout += purchaseItem.total_price;
            purchaseItems.push(purchaseItem);
        }
        data.total_checkout = total_checkout
        const insertedItems = await Pur_detail.insertMany(purchaseItems)
        
        await Purchases.findByIdAndUpdate(newPurchase._id,data);
        const finaldataTransaksi = await Purchases.findById(newPurchase._id)
        res.status(201).json({
            status: 201,
            message: "berhasil membuat Transaksi",
            Transaksi: finaldataTransaksi,
            Transaksi_detail: insertedItems
        })
        }catch(err){
           res.status(400).json({
            status: 400,
            message: `Data tidak berhasil ditambahkan`,
            keterangan: err.message
           })
        }
        
    },
    allTransaksi : async (req,res) => {
        try{
            const allTransaksi = await Purchases.find({id_user:req.query.id_user})
           
        if(allTransaksi.length !== 0) {
            res.status(200).json({
                Status:200,
                Data:allTransaksi
            })
        }
        else {
            return res.status(404).json({
                Status:404,
                Message:"Anda tidak memiliki riwayat Transaksi"
            })
        }
        }catch(err) {
            res.status(400).json({
                Status:400,
                Message:"Tidak berhasil get data Transaction",
                Keterangan:err.message
            })
        }   
    },
    detailTrac : async (req,res) => {
        try{
            const transaksi = await Purchases.findById(req.query.id_purchases)
            const detail = await Pur_detail.find({id_purchases:req.query.id_purchases})
            if(detail.length !== 0) {
                res.status(200).json({
                    Status:200,
                    transaksi:transaksi,
                    Detail_transaksi:detail
                })
            }
            else {
                return res.status(404).json({
                    Status:404,
                    Message:"Anda tidak memiliki riwayat Transaksi"
                })
            }
        }catch(err) {
            res.status(400).json({
                Status:400,
                Message:"Tidak berhasil get detail Transaction",
                Keterangan:err.message
            })
        }
    },
    updateStatus : async (req,res) => {
        const id = req.query.id_purchases
        try{
            let data;
            data = await Purchases.findById(id);
            if(!data) {
                return res.status(404).json({
                    Status:404,
                    Message:`Id ${id} Tidak ditemukan`,
                })
            }
            data.Status="Success";
                await Purchases.findByIdAndUpdate(id,data)
                res.status(200).json({
                    Status:200,
                    Message: "Berhasil Updat Status",
                    Data : data
            })

        }catch(err) {
            res.status(400).json({
                Status:400,
                Message:"Tidak berhasil Update Transaksi",
                Keterangan:err.message
            })
        }
    },
    deleteTransaksi: async (req,res) => {
        const id = req.query.id_purchases
        try{
            if(await Purchases.findById(id)) {
                await Purchases.findByIdAndDelete(id);
                await Pur_detail.deleteMany({id_purchases:id})
                res.status(200).json({
                    Status:200,
                    Message: "Berhasil Delete Transaksi"
                })
            }
            else {
                return res.status(404).json({
                    Status:404,
                    Message:`Id ${id} Tidak ditemukan`,
                })
            }
        }catch(err) {
            res.status(400).json({
                Status:400,
                Message:"Tidak berhasil Delete Transaksi",
                Keterangan:err.message
            })
        }
    }
}