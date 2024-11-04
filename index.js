const express = require('express');
const dotenv = require('dotenv');
const { connectDB, getDB } = require('./config/db');
const cors = require('cors');

dotenv.config();

const app = express();

connectDB();

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(req.method, req.hostname, req.path, timestamp);
  console.log(req.body);
  next();
};

app.use(cors()); 
app.use(express.json());
app.use(logger);
app.use('/images', express.static('images'));

app.use('/images', (req, res) => {
    res.status(404).json({ message: 'Image not found' });
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

