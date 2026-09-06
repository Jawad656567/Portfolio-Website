const express = require("express");
const verifyJWT = require("../middlewares/auth.middleware");
const { loginUser,getProfile,logoutUser} = require("../controllers/userController.js");




const router = express.Router();



router.post("/login", loginUser);

router.get("/profile", verifyJWT, getProfile);

router.post("/logout", verifyJWT, logoutUser);


module.exports = router;