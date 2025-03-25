import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        if(password.length < 6) {
            return res.status(400).json({
                message: "Password must be atleast 6 characters🤦‍♂️"
            });
        };

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists, try another one😁",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin account
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Account Created Successfully🥳",
            success: true
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User doesn't exits",
                success: false
            });
        };

        const isPassMatch = bcrypt.compare(password, user.password);
        if(!isPassMatch) {
            return res.status(400).json({
                message: "Incorrect Password",
                success: false
            });
        };

        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET);

        res.status(200).cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpsOnly: true,
            sameSite: 'strict' 
        }).
        json({
            message: `Welcome ${user.fullName}😘`,
            success: true,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email:user.email,
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200)
        .cookie("token", "", {
            maxAge: 0,
            httpsOnly: true,
            sameSite: 'strict'
        })
        .json({
            message: "Logout Successfully!",
            success: true
        });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            res.status(404).json({
                message: "Profile Picture👦🏻 is required!",
                success: false
            });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic:uploadResponse.secure_url}, {new:true});

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error("Error during updateProfile:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error during checkAuth:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}