const express = require('express');
const App = express();
const port = 5000;
const connectDB = require('./configs/database');
const router = require('./routers');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/middleware');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

connectDB();
// const app = express();



App.use(cors());// không bị dính lỗi 
App.use(cookieParser());//tạo cookie
App.use(express.json());
App.use(express.urlencoded({ extended: true }));





router(App);

App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


