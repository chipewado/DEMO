const express = require('express');
const router = express.Router();
const accoutController = require('../controllers/account.controller');
const {
 register,
login, // thêm Login ở đây
  getAccounts,
  updateAccount,
  deleteAccount,
  
} = require('../controllers/account.controller');

const authMiddleware = require('../middleware/middleware');

// Đăng ký tài khoản (có middleware kiểm tra/validate)
router.post('/register', register);

// Đăng nhập
router.post('/login', login);
// router.post('/login', ()=>{console.log('ok')});

// Các route quản lý tài khoản
router
  .route('/')
  .get(authMiddleware, getAccounts);

router
  .route('/:id')
  .patch(authMiddleware, updateAccount)
  .delete(authMiddleware, deleteAccount);

module.exports = router;
