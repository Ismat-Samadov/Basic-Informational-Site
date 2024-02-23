const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';

    // Set default file to index.html if no specific page is requested
    if (filePath === './.html') {
        filePath = './index.html';
    }

    // Check if the requested file exists
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If file not found, serve 404.html
            fs.readFile('./404.html', (err, content) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            });
        } else {
            // Serve the requested file
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
