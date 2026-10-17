import OrderModel from "../model/Order"

export const addOrderItems = async(req,res)=>{
    try {
        const {items , totalAmount , address , paymentId} = req.body
        if(items && items.length === 0){
            res.status(400).json({message : 'No order items'})
        }
        else{
            const order = new OrderModel({
                userId : req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
        }
        const createdOrder =  await order.save()

        // send confimation Email
        const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name}</p>
        <p>Your order has been placed successfully! Order ID : <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid : ₹${totalAmount.toFixed(2)}</p>
        <p>It will be shipped to : ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with ShopNest!</p>
        `
        await sendEmail({
            email : req.user.email,
            subject : 'ShopNest - Order Confimation',
            message
        })
        res.status(200).json(createdOrder)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const getMyOrders = async(req,res)=>{
    try {
        const orders =  await OrderModel.find({userId : req.user_id})
        res.json(orders)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const getOrders = async(req,res)=>{
    try {
        const orders = await OrderModel.find({}).populate('userId', 'id name')
        res.json(orders)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const updateOrderStatus =  async(req,res)=>{
    try {
        const order = await OrderModel.findById(req.params.id)
        if(order){
            order.status = req.body.status || order.status
            const updateOrder = await order.save()
            res.json(updateOrder)
        }
        else{
            res.status(400).json({message : 'Order not found'}) 
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
} 