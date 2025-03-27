import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Fix here
        if (!token) {
            return res.status(403).json({
                message: "Unauthorized User !!!",
                success: false
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);  // No need for await
        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        const user = await User.findById(decode.userId).select("-password");

        if (!user) {
            return res.status(404).json({ 
                message: "User not found",
                success: false
            });
        }
    
        req.user = user;
        next();  // Proceed to the next middleware or route handler

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export default isAuthenticated;