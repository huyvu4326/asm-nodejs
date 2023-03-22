import Product from "../models/product";
import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    status: Joi.boolean().required(),
    quantity: Joi.number().required(),
})

export const create = async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const data = await Product.create(req.body)

        return res.status(200).json({
            message: "Thêm sản phẩm thành công",
            data
        })
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}
export const getAll = async (req, res) => {
    try {
         const data=await Product.find()
         if(data.length===0){
            return res.status(200).json({
                message:"Không có sản phẩm nào"
            })
         }
         return res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}
export const get = async (req, res) => {
    try {
        const data=await Product.findById(req.params.id)
        if(data.length===0){
           return res.status(200).json({
               message:"Không có sản phẩm nào"
           })
        }
        return res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}
export const remove = async (req, res) => {
    try {
        const data=await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            message:"Xóa sản phẩm thành công",
            data
        })
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}
export const update = async (req, res) => {
    try {
        const data=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        return res.status(200).json({
            message:"Cập nhập sản phẩm thành công",
            data
        })
    }
    catch (error) {
        res.status(400).json({
            message: error
        })
    }
}