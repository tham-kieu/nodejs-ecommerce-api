import User from "../models/user.model";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, email, password, phone, role, addresses, avatar } = req.body;

        // 1. Kiểm tra Email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email đã tồn tại" });
        }

        // 2. Mã hóa mật khẩu
        const hashedPassword = await bcryptjs.hash(password, 10);

        // 3. Tạo người dùng mới
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            addresses,
            avatar,
        });

        // 4. Bỏ trường password trước khi trả về
        user.password = undefined;

        return res.status(201).json(user);
    } catch (error) {
        // Lỗi từ Joi validation đã được xử lý ở middleware validateRequest, 
        // Lỗi này chủ yếu là lỗi database.
        return res.status(400).json({ error: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Tìm người dùng theo email và lấy cả password (select: "+password")
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ error: "Tài khoản không tồn tại" });
        }

        // 2. So sánh mật khẩu
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Mật khẩu không chính xác" });
        }

        // 3. Tạo JWT (dùng secret key "123456" và hết hạn trong 1 giờ)
        const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });

        // 4. Bỏ trường password trước khi trả về
        user.password = undefined;

        // 5. Trả về token và thông tin user
        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};