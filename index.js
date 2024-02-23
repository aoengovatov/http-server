const express = require("express");
const chalk = require("chalk");
const { addNote, getNotes } = require("./notes.controller");

const PORT = 3000;

const server = express();

server.set("view engine", "ejs");
server.set("views", "pages");

server.use(
    express.urlencoded({
        extanded: true,
    })
);

server.get("/", async (req, res) => {
    res.render("index", { title: "Express App", notes: await getNotes() });
});

server.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", { title: "Express App", notes: await getNotes() });
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
