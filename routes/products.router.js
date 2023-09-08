const express = require('express');
const router = express.Router();
const {
    createProduct,getAllProduc
} = require('../controller/product.controller')

router.post('/create',createProduct);
router.get('/allProducts',getAllProduc);

module.exports = router