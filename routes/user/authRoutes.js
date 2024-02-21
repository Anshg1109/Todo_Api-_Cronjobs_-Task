import express from "express";
import { registerUser, getAllUsers, userLogout } from "../../controllers/authController.js";
import { isUser } from "../../middleware/validateTokenHandler.js";
const router = express.Router();

// User routes
router.post('/signup', registerUser);
router.get('/getAlluser', getAllUsers);
router.post('/logout',isUser, userLogout);


export default router;
