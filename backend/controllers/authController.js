import UserModel from "../model/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '30d'})
}
export const registerUser = async(req,res)=>{
    try {
        const {name , email,  password} = req.body

        const existingUser = await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message : 'User already exists'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new UserModel.create({name, email, password: hashedPassword})
        if(user){
            const otp = Math.floor(100000 + Math.random()*900000).toString()
            const message = `
            Welcome to Shopnest ${name}
            Your OTP for Shopnest registration is: ${otp}`
            await sendEmail({
                email : user.email,
                subject : 'Welcome to Shopnest- Your OTP',
                message
            })
            res.status(201).json({message :  'User registered successfully. Please check your email for OTP.'})

            res.status(201).json({
                _id : user._id,
                name : user.name,
                email : user.email,
                role : user.role,
                token : generateToken(user._id) 
            })
        }
        else{
            res.status(400).json({message : 'Invalid User Data'})
        }
    } catch (error) {
        res.status(500).json(
            {
                message : 'Server Error',
                error : error.message
            })
    }
}
