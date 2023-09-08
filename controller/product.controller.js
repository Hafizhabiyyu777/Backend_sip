const Products = require("../models/products");


module.exports = {
    createProduct: async(req,res) => {
        try {
            const Data = ({ nameItem, price, photo} = req.body)
            if(!(nameItem && price)) {
                return res.status(400).json({
                    status: 400,
                    message: "Semua data harus diisi: nameItem,price ",
                  });
            }
            if(Data.photo == null) {
                Data.photo= "https://i.postimg.cc/3W5vpknS/27002.jpg";
            }
            const newProduct = await Products.create(Data)
            res.status(201).json({
                status: 201,
                message: "berhasil menambah Item",
                Data: newProduct
            })
        }catch(err){
            res.status(400).json({
                status: 400,
                message: `Data tidak berhasil ditambahkan`,
                keterangan: err.message,
            });
        }
        
    },
    getAllProduc: async(req, res) => {
        try{    
            res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            const allProduct = await Products.find().populate('nameItem');
            if(allProduct.length !== 0) {
                res.status(200).json({
                    message: "berhasil get all data product",
                    Data : allProduct
                })
            }
            else {
                return res.status(404).json({
                    status:404,
                    message: `Data Kosong(Input terlebih dahulu products)`
                })
            }
           
        }catch(err){
            res.status(400).json({
                status: 400,
                message: `Tidak berhasil ambil data`,
                keterangan: err,
            });
        }
    }
}