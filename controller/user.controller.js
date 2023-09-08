const Users = require("../models/users");

module.exports = {
  Register: async (req, res) => {
    const userdata = ({ username, email, password } = req.body);
    try {
      if (!(username && email && password)) {
        return res.status(400).json({
          status: 400,
          message: "Semua data harus diisi: username, email, dan password",
        });
      }
      const terdaftar = await Users.findOne({ email: userdata.email });
      if (terdaftar) {
        return res.status(400).json({
          message: "Email Sudah terdaftar",
          status: 400,
        });
      }
      const newUser = await Users.create(userdata);
      res.status(201).json({
        message: "Berhasil create new user",
        status: 201,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: `Data tidak berhasil ditambahkan`,
        keterangan: err,
      });
    }
  },

  login: async (req, res) => {
    const data = ({ username, password } = req.body);
    try {
      const cekUser = await Users.findOne({ username: data.username });
      if (cekUser) {
        if (cekUser.password == data.password) {
            const infoUser = {...cekUser.toObject() };
            delete infoUser.password;
          res.status(200).json({
            status: 200,
            message: "Berhasil Login!",
            data: infoUser,
          });
        } else {
          return res.status(400).json({
            message: "Password salah",
            status: 400,
          });
        }
      } else {
        return res.status(404).json({
          message: "username tidak ditemukan",
          status: 404,
        });
      }
    } catch (err) {
        res.status(400).json({
            status: 400,
            keterangan: err.message,
          });
    }
  },
};
