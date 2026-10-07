import UserModel from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid User Data",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const message = `
Welcome to ShopNest, ${name}!

Your OTP for ShopNest registration is:

${otp}

Please use this OTP to verify your email.
`;

    await sendEmail(user.email, "Welcome to ShopNest - Your OTP", message);

    return res.status(201).json({
      message: "User registered successfully. Please check your email for OTP.",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
    else{
        res.status(401).json({message : "Invaild email or password"})
    }
  } catch (error) {
    res.status(500).json({message : error.message})
  }
};

export const getUsers = async(req,res)=>{
    try {
        const users = await UserModel.find({}).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}
