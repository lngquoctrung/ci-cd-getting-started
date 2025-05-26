const express = require("express");

const app = express();
app.use(express.json());

app.get("/health-check", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "The server is UP"
    });
});

app.get("/users", (req, res) => {
     res.status(200).json({
         status: 200,
         data: [
             { id: 1, name: "QcTrung" },
             { id: 2, name: "Trung" }
         ]
     });
});

app.post("/users", (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({
            status: 400,
            message: "Name is required"
        });
    }
    res.status(201).json({
       status: 201,
       data: {
           id: 3,
           name
       }
    });
});

module.exports = app;