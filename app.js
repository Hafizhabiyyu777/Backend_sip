const express = require('express')
const db = require('./config/db')
const app = express()


let cors = require("cors");
const allroutes = require("./routes")

const PORT = process.env.PORT || 3000

db.then(() => {
    console.log("database terkoneksi");
})
.catch((err) => {
    console.log(err);
})

app.use(express.json())
app.use(cors());
app.use(allroutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})