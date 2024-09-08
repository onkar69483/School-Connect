const express = require('express');

const cors = require('cors');

require('dotenv').config();
const app = express();


require('./config/db');

const mongoose = require('mongoose');
// const userRouter = require('./routes/user');
// app.use(userRouter);



app.use(
    cors({
        origin: "http://localhost:8081",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

    })
    
);

app.get('/api/users', (req, res) => {
    res.send('<h1>Backend connected with proxy</h1>')
})


app.listen('8000', () => {
    console.log("Backend is ON!");
})  

