const express = require("express");
const router =express.Router();

const {
    checkOut,allTransaksi,detailTrac,updateStatus,deleteTransaksi
} = require('../controller/checkout.controller')

router.post("/checkout",checkOut)
router.get("/allTransaction",allTransaksi)
router.get("/detailTransaction",detailTrac)
router.put("/changeStatus",updateStatus)
router.delete("/deleteTransaction",deleteTransaksi)

module.exports = router