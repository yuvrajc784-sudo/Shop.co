
import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
    res.json({login : "this is for user login"})
})
router.get("/signUp", (req, res) => {
    res.json({SignUp : "this is for user SignUp"})
})

export default router;