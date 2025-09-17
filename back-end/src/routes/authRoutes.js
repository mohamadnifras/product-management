import express from "express"
import {signUpController,signInController,getLoggedInUser,logoutUser,refreshAccessToken} from "../controllers/authControllers.js"
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/sign-up", signUpController)
router.post("/sign-in", signInController)
router.get("/me", authMiddleware,getLoggedInUser)
router.post('/logout',logoutUser)
router.post('/refresh-token', refreshAccessToken);



export default router;