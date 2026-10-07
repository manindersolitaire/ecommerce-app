import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

await connectDB()
app.get('/', (req,res)=>{
    res.send("ShopNest Backend is working properly..")
})

app.use('/api/auth', authRouter)
app.use('/api/product', productRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})



