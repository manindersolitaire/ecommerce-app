import OrderModel from "../model/Order.js"
import ProductModel from "../model/Product.js"
import UserModel from "../model/User.js"

export const getAdminStats = async(req,res)=>{
    try {
        const totalOrders = await OrderModel.countDocuments()
        const totalProducts = await ProductModel.countDocuments()
        const totalUsers = await UserModel.countDocuments()

        const orders = await OrderModel.find({})
        const totalRevenue = orders.reduce((acc, item) => acc + item.totalAmount, 0)

        res.json({totalOrders, totalProducts , totalUsers, totalRevenue})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}