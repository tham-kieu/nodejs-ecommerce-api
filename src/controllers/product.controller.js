// product.controller.js
import { error } from "console";
import Product from "../models/product.model.js";
import req from "express/lib/request";
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            price,
            salePrice,
            images,
            stock,
            status,
            featured,
            ratings
        } = req.body;
        const product = await Product.create({
            name,
            slug,
            description,
            price,
            salePrice,
            images,
            stock,
            status,
            featured,
            ratings
        });
        return res.status(201).json(product);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const getProductsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ error: "Product not found" });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // new: true => trả về dữ liệu đã update
        );
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

