import express from "express";

const app = express();

app.get("/test", (req, res) => {
    res.send("first test");
});

app.listen(3000);