import cloudinary from "../config/cloudinary.js"
import ProductModel from "../model/Product.js"

export const getProducts = async(req,res)=>{
    try {
        const products =  await ProductModel.find({})
        res.json(products)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const getProductById =  async(req,res)=>{
    try {
        const product =  await ProductModel.findById(req.params.id)
        if(product){
            res.json(product)
        }
        else{
            res.status(404).json({message : "Product not found"}) 
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const createProduct = async(req,res)=>{
    try {
        const {name, description , category , price , stock} = req.body
        let imageUrl = ""
        if(req.file){
            const result =  await cloudinary.uploader.upload(req.file.path)
            imageUrl = result.secure_url
        }
        const product = new ProductModel({
            name , description , price , category , stock , imageUrl
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const updateProduct =  async(req,res)=>{
    try {
        const {name , description , price , category , stock} = req.body
        const product = await ProductModel.findById(req.params.id)
        if(product){
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || product.category
            product.stock = stock || product.stock
        if(req.file){
            const result =  await cloudinary.UploadStream.upload(req.file.path)
            imageUrl = result.secure_url
        }
        const updatedProduct = await product.save()
        res.json(updatedProduct)
        }
        else{
            res.status(404).json({message : "Product not found"}) 
        }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const deleteProduct = async(req,res)=>{
    try {
        const product = await ProductModel.findById(req.params.id)
        if(product){
            await product.deleteOne()
        }
        else{
            res.status(404).json({message : "Product not found"}) 
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

