const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Product = require('../models/product')
const ProductsController = require('../controllers/products')
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, ProductsController.products_get_all)

router.post('/', ProductsController.products_create_product)

router.get('/:productId', ProductsController.products_get_product)

router.patch('/:productId', ProductsController.products_update_product)

router.delete('/:productId', ProductsController.products_delete)


module.exports = router
