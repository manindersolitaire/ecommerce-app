import express from 'express'

const authRouter =  express.Router()


authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.get('/users', getUsers)

export default authRouter