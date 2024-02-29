const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");

const { addNote, getNotes, deleteNoteById, editNoteById } = require("./notes.controller");
const { addUser, loginUser } = require("./user.controller");

const PORT = 3000;

const server = express();

server.set("view engine", "ejs");
server.set("views", "pages");
server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());
server.use(cookieParser());

server.use(
    express.urlencoded({
        extended: true,
    })
);

server.get("/login", async (req, res) => {
    res.render("login", {
        title: "Express App",
        error: false,
    });
});

server.post("/login", async (req, res) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);

        res.cookie("token", token);
        res.redirect("/");
    } catch (e) {
        res.render("login", {
            title: "Express App",
            error: e.message,
        });
    }
});

server.post("/register", async (req, res) => {
    try {
        await addUser(req.body.email, req.body.password);
        res.redirect("/login");
    } catch (e) {
        console.log(e);
        if (e.code === 11000) {
            res.render("register", {
                title: "Express App",
                error: "Email is already register",
            });
            return;
        }

        res.render("register", {
            title: "Express App",
            error: e.message,
        });
    }
});

server.get("/register", async (req, res) => {
    res.render("register", {
        title: "Express App",
        error: false,
    });
});

server.use(auth);

server.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        userEmail: req.user.email,
        created: false,
        error: false,
    });
});

server.post("/", async (req, res) => {
    try {
        await addNote(req.body.title, req.user.email);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            userEmail: req.user.email,
            created: true,
            error: false,
        });
    } catch (e) {
        console.error("Creation error", e);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            userEmail: req.user.email,
            userEmail: req.user.email,
            created: false,
            error: true,
        });
    }
});

server.delete("/:id", async (req, res) => {
    try {
        await deleteNoteById(req.params.id);

        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            userEmail: req.user.email,
            created: false,
            error: false,
        });
    } catch (e) {
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            userEmail: req.user.email,
            created: false,
            error: e.message,
        });
    }
});

server.put("/:id", async (req, res) => {
    try {
    } catch (e) {
        const id = req.params.id;
        const title = req.body.title;

        await editNoteById(id, title);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: false,
            error: false,
        });
    }

    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: e.message,
    });
});

mongoose
    .connect(
        "mongodb+srv://aoengovatov:aoengovatovadmin@cluster0.ndz6eui.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        server.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}`));
        });
    });
