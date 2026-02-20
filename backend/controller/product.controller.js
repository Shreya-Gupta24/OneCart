import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/product.model.js";
export const addProduct= async(req, res) => {
    try {
        let {name,description,price,category,subCategory,bestseller,sizes}= req.body;
        let image1= await uploadOnCloudinary(req.files.image1[0].path)
        let image2= await uploadOnCloudinary(req.files.image2[0].path)
        let image3= await uploadOnCloudinary(req.files.image3[0].path)
        let image4= await uploadOnCloudinary(req.files.image4[0].path)
        let product= await Product.create({name,description,price : Number(price),category,subCategory,bestseller:bestseller === "true"?true:false,sizes: JSON.parse(sizes),image1,image2,image3,image4, date: Date.now()})
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:`addProduct: ${error.message}`});
    }
}
export const listProduct = async(req, res) => {
    try {
        let products= await Product.find({});
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:`listProduct: ${error.message}`});
    }
}

export const removeProduct= async (req, res) => {
    try {
        let {id}= req.params;
        let product= await Product.findByIdAndDelete(id);
        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:`removeProduct: ${error.message}`});
    }
}