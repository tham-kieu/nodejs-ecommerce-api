// Đặt trong thư mục: src/middlewares/validateRequest.js

const validateRequest = (schema, body = "body") => {
    return (req, res, next) => {
        // Kiểm tra req[body], mặc định là req.body
        const { error } = schema.validate(req[body], { abortEarly: false });

        if (error) {
            return res.status(400).json({
                errors: error.details.map((error) => error.message),
            });
        }

        next();
    };
};

export default validateRequest;