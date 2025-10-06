import { Router } from "express";
// THÊM .js
import { signin, signup } from "../controllers/auth.controller.js";
// SỬA TÊN THƯ MỤC VÀ THÊM .js
import validateRequest from "../middleware/validateRequest.js";
// THÊM .js
import { signinSchema, signupSchema } from "../validation/auth.validation.js";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signupSchema), signup);
authRouter.post("/signin", validateRequest(signinSchema), signin);

export default authRouter;