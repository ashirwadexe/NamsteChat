import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/users", isAuthenticated, getUsersForSidebar);
router.get("/:id", isAuthenticated, getMessages);
router.get("/send/:id", isAuthenticated, sendMessage);

export default router;