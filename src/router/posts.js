import { Router } from "express";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost,
} from "../controllers/post.controller.js";
import validateRequest from "../middleware/validateRequest.js";
import { postSchema } from "../validation/post.schema.js";
import { restrictTo } from "../middleware/auth.middleware.js";


const postRouter = Router();

// Lấy danh sách
postRouter.get("/", getPosts);
// Lấy chi tiết bài viết
postRouter.get("/:id", getPostById);
postRouter.use(restrictTo("admin", "staff"));
// Thêm bài viết
postRouter.post("/", validateRequest(postSchema), createPost);
// Cập nhật
postRouter.put("/:id", validateRequest(postSchema), updatePost);
// Xóa bài viết
postRouter.delete("/:id", deletePost);

export default postRouter;