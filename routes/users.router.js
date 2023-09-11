const express = require('express')
const router = express.Router();

const {
    Register,login,getDataUser
} = require("../controller/user.controller")

router.post('/create', Register);
router.post('/login',login);
router.get('/alluser',getDataUser);

module.exports = router;