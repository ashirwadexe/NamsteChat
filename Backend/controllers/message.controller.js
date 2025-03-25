import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        //here we are finding all the users expect the loggedInUser(user itself) and also dont fetch there passwords
        const filteredUsers = await User.find({_id: { $ne: loggedInUser }}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error during getUsersForSidebar:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.error("Error during getMessages :", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io
        
        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error during sendMessage  :", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};