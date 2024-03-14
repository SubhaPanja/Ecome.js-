const http = require('http');
const url = require('url');
const fs = require('fs');

// Task 1: Create a Node.js server to handle requests at port 3001
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    // Task 2: Endpoint "/" returns all the products from products.json file
    if (reqUrl.pathname === '/') {
        fs.readFile('products.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error('Error reading products.json:', err);
                return;
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    }

    // Task 4: Endpoint "/?category=<category>" returns products matching the category
    else if (reqUrl.pathname === '/' && reqUrl.query.category) {
        const category = reqUrl.query.category.toLowerCase();

        fs.readFile('products.json', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                console.error('Error reading products.json:', err);
                return;
            }

            const products = JSON.parse(data);
            const filteredProducts = products.filter(product => product.category.toLowerCase() === category);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filteredProducts));
        });
    }

    // Handle invalid endpoints
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
server.listen(3001, () => {
    console.log('Server started...');
});

// Handle server start error
server.on('error', (error) => {
    console.error('Unable to start server:', error);
});
