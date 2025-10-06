import { Router } from "express";
import postRouter from "./posts.js"; // <-- THÊM .js
import productRouter from "./product.js";
import authRouter from "./auth.js"; // <-- THÊM DÒNG NÀY VÀ THÊM .js

const router = Router();

// router bài viết

router.use("/posts", postRouter);
router.use("/products", productRouter);
router.use("/auth", authRouter);
export default router;