const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require("path");
const port = process.env.PORT || 4001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => console.log(`Server is listening on port ${port}`));