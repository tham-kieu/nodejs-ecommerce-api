// product.js
import { Router } from "express";
import {
    createProduct,
    getProducts,
    getProductsById,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

const productRouter = Router();

// Lấy danh sách sản phẩm
productRouter.get("/", getProducts);
// Lấy chi tiết sản phẩm theo id
productRouter.get("/:id", getProductsById);
// Thêm sản phẩm mới
productRouter.post("/", createProduct);
// Cập nhật sản phẩm
productRouter.put("/:id", updateProduct);
// Xóa sản phẩm
productRouter.delete("/:id", deleteProduct);

export default productRouter;