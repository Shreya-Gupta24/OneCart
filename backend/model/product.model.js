import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    image4: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    bestseller: {
        type: Boolean
    },
    sizes: {
        type: Array,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
},{timestamps: true, minimized: true});

const Product= mongoose.model("Product", productSchema);
export default Product;