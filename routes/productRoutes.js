
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/Product');
const {
    asyncHandler,
    NotFoundError,
    ValidationError
} = require('../middleware/customMiddleware');

// List all products with filtering and pagination
// Query params: ?category=electronics&page=1&limit=10
router.get('/', asyncHandler(async (req, res) => {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) {
        filter.category = category;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find(filter)
        .skip(skip)
        .limit(parseInt(limit));
    const total = await Product.countDocuments(filter);
    res.json({
        products,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
    });
}));

// Search products by name (case-insensitive)
// GET /api/products/search?name=phone
router.get('/search', asyncHandler(async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: 'Missing search query parameter: name' });
    }
    const products = await Product.find({
        name: { $regex: name, $options: 'i' }
    });
    res.json(products);
}));

// Product statistics: count by category
// GET /api/products/stats
router.get('/stats', asyncHandler(async (req, res) => {
    const stats = await Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { _id: 0, category: '$_id', count: 1 } }
    ]);
    res.json(stats);
}));
// Get a specific product by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.json(product);
}));
// Create a new product
router.post('/', asyncHandler(async (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || typeof price !== 'number' || !category) {
        throw new ValidationError('Missing or invalid product fields');
    }
    const product = new Product({
        id: uuidv4(),
        name,
        description,
        price,
        category,
        inStock
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
}));
// Update a product
router.put('/:id', asyncHandler(async (req, res) => {
    const { name, description, price, category, inStock } = req.body;
    if (!name || !description || typeof price !== 'number' || !category) {
        throw new ValidationError('Missing or invalid product fields');
    }
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price, category, inStock },
        { new: true }
    );
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    res.json(product);
}));
// Delete a product
router.delete('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError('Product not found');
    }
    await product.remove();
    res.json({ message: 'Deleted Product' });
}));

module.exports = router;