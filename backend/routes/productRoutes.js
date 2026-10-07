import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { admin } from '../middleware/adminMiddleware.js'
import { createProduct, getProductById, getProducts } from '../controllers/productController.js'

const productRouter =  express.Router()

productRouter.route('/').get(getProducts).post(protect, admin, createProduct)
productRouter.route('/:id').get(getProductById)

export default productRouter