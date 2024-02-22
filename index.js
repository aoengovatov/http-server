const http = require("http");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");
const { addNote } = require("./notes.controller");

const PORT = 3000;
const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.html"));
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(content);
    } else if (req.method === "POST") {
        res.writeHead(200, {
            "Content-Type": "text/plain",
        });
        const body = [];
        req.on("data", (data) => {
            body.push(Buffer.from(data));
        });
        req.on("end", () => {
            const title = body.toString().split("=")[1].replaceAll("+", " ");
            addNote(title);
            res.end(`Title = ${title}`);
        });
    }
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
