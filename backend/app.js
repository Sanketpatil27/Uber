const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');

connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res)=> {
    return res.json({msg: "Server is running!"});
})

app.use('/api/v1/users', userRoutes); 
app.use('/api/v1/captains', captainRoutes); 

module.exports = app;