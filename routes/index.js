const express = require('express');
const router = express.Router();

const userRouter = require('./users.router')
const producRouter = require('./products.router')
const checkOut = require("./checkout.router")

router.use('/users' ,userRouter)
router.use('/products',producRouter)
router.use('/transaction',checkOut)
module.exports = router