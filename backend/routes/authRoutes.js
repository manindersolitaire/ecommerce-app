import express from 'express'
import { getUsers, loginUser, registerUser } from '../controllers/authController.js'
import protect from '../middleware/authMiddleware.js'
import { admin } from '../middleware/adminMiddleware.js'

const authRouter =  express.Router()


authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/users', protect, admin , getUsers)

export default authRouter