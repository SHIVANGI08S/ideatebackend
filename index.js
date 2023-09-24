const connectDB = require('./config/db');
const express = require('express');
require('dotenv').config()
const cors = require('cors');


connectDB();

const app = express();
app.use(cors());
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', require('./Routes/user')); 
app.use('/api/ideas', require('./Routes/Ideas')); 

app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
  });