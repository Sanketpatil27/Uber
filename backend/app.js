const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');

connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=> {
    return res.json({msg: "Server is running!"});
})

app.use('/api/v1/users', userRoutes); 

module.exports = app;