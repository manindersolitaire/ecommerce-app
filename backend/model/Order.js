import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true},
    items : [
        {
            productId : {type : mongoose.Schema.Types.ObjectId, ref : 'Product', required : true},
            qty : {type : Number, required : true},
            price : {type : Number, required : true},
        }
    ],
    totalAmount : {type : Number , required : true},
    address : {
        fullName : {type : String , required : true},
        street : {type : String , required : true},
        city : {type : String , required : true},
        postalCode : {type : String , required : true},
        country : {type : String , required : true},
    },
    paymentId : {type : String},
    status: {type : String , enum : ['Pending', 'Shipped', 'Delivered'], default : 'Pending'}
}, {timeStamps : true})

const OrderModel = mongoose.model('Order', orderSchema)
export default OrderModel
