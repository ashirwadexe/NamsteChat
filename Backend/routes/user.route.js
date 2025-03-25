import express from "express";
import { checkAuth, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/update-profile').put(isAuthenticated, updateProfile)
router.route('/check').get(isAuthenticated, checkAuth)


export default router;