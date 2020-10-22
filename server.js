const http = require('http');

const {
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct,
    deleteProduct
} = require('./controllers/productController');


const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        console.log(req.url.match(/\/api\/products\/([0-9]+)/), req.method === 'GET');
        getProduct(req, res, id);
    } else if ( req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        updateProduct(req, res, id);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        deleteProduct(req, res, id);
    } else {
        console.log(req.url, req.method);
        console.log(req.url.match(/\/api\/products\/([0-9]+)/), req.method === 'DELETE');
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
