const http = require("http");
const chalk = require("chalk");
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log("Method:", req.method);
    console.log("url:", req.url);
    console.log("Server");
    res.end("Hello from server!");
});

server.listen(PORT, () => {
    console.log(chalk.green(`Server has been started on port ${PORT}`));
});
