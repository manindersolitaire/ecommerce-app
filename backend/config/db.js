import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(["8.8.8.8","0.0.0.0"])
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected successfully")
    } catch (error) {
        console.error("MongoDB connection failed", error.message)
    }
}

export default connectDB