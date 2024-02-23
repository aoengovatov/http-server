const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, deleteNoteById } = require("./notes.controller");

const PORT = 3000;

const server = express();

server.set("view engine", "ejs");
server.set("views", "pages");
server.use(express.static(path.join(__dirname, "public")));

server.use(
    express.urlencoded({
        extanded: true,
    })
);

server.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

server.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.render("index", { title: "Express App", notes: await getNotes(), created: true });
});

server.delete("/:id", async (req, res) => {
    await deleteNoteById(req.params.id);
    
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
    });
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
