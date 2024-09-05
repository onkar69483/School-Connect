const express = require('express');

const cors = require('cors');

const app = express();

require('dotenv').config()
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

app.get('/', (req, res) => {
    res.send('<h1>Backend says hello</h1>')
})


app.listen('8000', () => {
    console.log("Backend is ON!");
})  

