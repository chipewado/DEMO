const express = require('express');
const App = express();
const port = 5000;
const connectDB = require('./configs/database');
const router = require('./routers');

connectDB();
const app = express();

App.use(express.json());



router(App);








App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});