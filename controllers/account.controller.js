const accountModel = require('../models/account.model');


module.exports = {
  // tạo tài khoản
    createAccount: async (req, res) => {
      const body = req.body;
      // console.log(body);
      const newAccount = await accountModel.create(body);
      return res.status(200).json(newAccount);
    },
// lấy tất cả tài khoản
     getAccounts: async (req, res) => {
      const accounts = await accountModel.find();
      return res.status(200).json(accounts);
    },
    // update tài khoảng
    updateAccount: async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const body = req.body;
      const upadteAdcount = await accountModel.findByIdAndUpdate(id, body, {new: true })
      return res.status(200).json(upadteAdcount);

      },
      //xóa tài khoảng 
      deleteAccount: async (req, res) => {
        const id = req.params.id;
        const deleteAccount = await accountModel.findByIdAndDelete(id);
        return res.status(200).json(deleteAccount);
      }

};