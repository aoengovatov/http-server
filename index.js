const http = require("http");
const express = require("express");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./notes.controller");

const PORT = 3000;
const basePath = path.join(__dirname, "pages");

const server = express();
server.use(
    express.urlencoded({
        extanded: true,
    })
);

server.get("/", (req, res) => {
    res.sendFile(path.join(basePath, "index.html"));
});

server.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.sendFile(path.join(basePath, "index.html"));
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
