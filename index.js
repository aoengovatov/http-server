const http = require("http");
const chalk = require("chalk");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;
const basePath = path.join(__dirname, "pages");

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.html"));
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(content);
    }
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
