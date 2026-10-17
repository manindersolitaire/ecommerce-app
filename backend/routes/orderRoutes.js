import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { admin } from '../ middleware/adminMiddleware.js'
import { addOrderItems, getMyOrders, getOrders, updateOrderStatus } from '../controllers/orderController.js'

const orderRouter =  express.Router()

orderRouter.route('/').post(protect , addOrderItems).get(protect , admin , getOrders)
orderRouter.route('/myorders').get(protect , getMyOrders)
orderRouter.route('/:id/status').put(protect , admin , updateOrderStatus)


export default orderRouter