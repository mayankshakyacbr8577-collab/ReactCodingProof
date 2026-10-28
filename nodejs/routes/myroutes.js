const express = require('express');
const router = express.Router();

const logger = (req, res, next) => {
    console.log('You accessed Method:', req.method, 'Path:', req.path);
    next();
};

router.use(logger);

let products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 }
];

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to API',
        endpoints: [
            'GET /products',
            'GET /products/:id',
            'POST /products',
            'PUT /products/:id',
            'DELETE /products/:id'
        ]
    });
});

router.get('/products', (req, res) => {
    res.json(products);
});

router.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

router.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || price === undefined) {
        return res.status(400).json({ error: 'Name and price are required' });
    }
    if (typeof price !== 'number') {
        return res.status(400).json({ error: 'Price must be a number' });
    }
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price
    };
    products.push(newProduct);
    res.status(201).json({
        message: 'Product added successfully',
        product: newProduct
    });
});

router.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const { name, price } = req.body;
    if (name !== undefined) {
        products[productIndex].name = name;
    }
    if (price !== undefined) {
        if (typeof price !== 'number') {
            return res.status(400).json({ error: 'Price must be a number' });
        }
        products[productIndex].price = price;
    }
    res.json({
        message: 'Product updated successfully',
        product: products[productIndex]
    });
});

router.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    const deletedProduct = products.splice(productIndex, 1)[0];
    res.json({
        message: 'Product deleted successfully',
        product: deletedProduct
    });
});

module.exports = router;
