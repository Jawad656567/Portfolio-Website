const User = require("../models/user");

// ─────────────────────────────────────────────
// LOGIN API
// ─────────────────────────────────────────────
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username);

  try {
    // Find user
    const user = await User.findOne({ username });

    console.log("Found user:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    console.log("Password correct:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generate Access Token
    const accessToken = user.generateAccessToken();

    // Get logged-in user
    const loggedinUser = await User.findById(user._id)
      .select("-password");

    // Cookie options
    const options = {
      httpOnly: true,
      secure: false,
    };

    // Send token in HttpOnly Cookie
    // Token is NOT sent in JSON response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json({
        message: "Login successful",
        user: loggedinUser,
      });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ─────────────────────────────────────────────
// GET PROFILE API
// ─────────────────────────────────────────────
const getProfile = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
    });

  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// ─────────────────────────────────────────────
// LOGOUT API
// ─────────────────────────────────────────────
const logoutUser = async (req, res) => {
  try {

    return res
      .status(200)
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
      })
      .json({
        message: "Logout successful",
      });

  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────
module.exports = {
  loginUser,
  getProfile,
  logoutUser,
};