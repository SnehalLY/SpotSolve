const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requirelogin = require("../middlewares/requirelogin");

// Improved Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;
        
        if (!name || !userName || !email || !password) {
            return res.status(422).json({ error: "All fields are required" });
        }

        const existingUser = await USER.findOne({ 
            $or: [{ email }, { userName }] 
        });

        if (existingUser) {
            return res.status(409).json({ 
                error: "User already exists with this email/username" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new USER({
            name,
            userName,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "Registration successful" });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Improved Signin Route
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Email and password required" });
        }

        const user = await USER.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { _id: user._id }, 
            Jwt_secret, 
            { expiresIn: "1h" } // Add token expiration
        );

        // Return essential user data with token
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName
            }
        });

    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({ error: "Server error during login" });
    }
});

module.exports = router;