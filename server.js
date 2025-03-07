import express from "express";

const app = express();
const port = process.env.PORT || 3000;

const contacts = [];

app.use(express.json());

app.get("/contacts", (req, res) => {
    res.status(200).json(contacts);
});

app.post("/contacts", (req, res) => {
    contacts.push(req.body);
    res.status(201).send(req.body);
})

app.listen(port, () => console.log(`Server now running on port ${port}`));