const express = require("express");

const cors = require("cors");

require("dotenv").config();
const app = express();
const Notice = require("./models/notice");

require("./config/db");

const mongoose = require("mongoose");

app.use(
    cors({
        origin: "http://localhost:8081",
    })
);

app.use(express.json());

app.get("/api/user/:id", (req, res) => {
    res.send("<h1>Backend connected with proxy</h1>");
});

app.post("/api/user", (req, res) => {
    res.send("<h1>Backend connected with proxy</h1>");
});

app.get("/api/notice", async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json(notices);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/notice/new", (req, res) => {});

app.post("/api/notice", async (req, res) => {
    try {
        const { title, notice, user, date, time } = req.body;
        const newNotice = new Notice({
            title,
            notice,
            user,
            date,
            time,
        });

        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

app.listen("8000", () => {
    console.log("Backend is ON!");
});
