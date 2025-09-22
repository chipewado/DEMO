const accountModel = require("../models/account.model");
const accountValid = require("../validations/account");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/middleware");
const express = require("express");
const router = express.Router();
const login = require("../middleware/middleware");
const Account = require("../models/account.model");
const jwt = require("jsonwebtoken");
module.exports = {
  // tạo tài khoản
  // createAccount: async (req, res) => {
  //   const body = req.body;
  //   // const newAccount = new Account({
  //   //           username,
  //   //           password: hashedPassword,
  //   //           fullname,
  //   //           email
  //   //       });
  //   //       await newAccount.save();
  //   //       res.status(200).json({ message: 'Account created successfully' });
  //   // console.log(body);
  //     newAccount = await accountModel.create(body);
  //   return res.status(200).json(newAccount);
  // },

  // Đăng ký tài khoản
  register: async (req, res) => {
    try {
      const { username, password, fullname, email } = req.body;

      // Kiểm tra trùng username hoặc email
      const existingAccount = await Account.findOne({
        $or: [{ username }, { email }],
      });
      if (existingAccount) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Hash mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tạo account mới
      const newAccount = new Account({
        username,
        password: hashedPassword,
        fullname,
        email,
      });

      await newAccount.save();
      res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // Login
  login: async (req, res) => {
    // console.log(req.body);
    try {
      const { username, password } = req.body;

      const account = await Account.findOne({ username });
      if (!account) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      // Tạo token JWT
      const token = jwt.sign(
        { id: account._id, username: account.username },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "7d" }
      );

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },

  // lấy tất cả tài khoản
  getAccounts: async (req, res) => {
    const accounts = await accountModel.find();
    return res.status(200).json(accounts);
  },
  // update tài khoảng
  updateAccount: async (req, res) => {
    const id = req.params.id;
    // console.log();
    const body = req.body;
    const upadteAdcount = await accountModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(upadteAdcount);
  },
  //xóa tài khoảng
  deleteAccount: async (req, res) => {
    const id = req.params.id;
    const deleteAccount = await accountModel.findByIdAndDelete(id);
    if (!deletedAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json(deleteAccount.message("Xóa thành công"));
  },
};
