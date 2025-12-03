const User = require("../models/user.model");

const signup = async (req, res) => {
    const fullName = req.body.name?.trim();
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "Email already in use." });
        }

        const user = await User.create({
            fullName,
            email,
            password
        });

        res.status(200).json({ success: true, message: "Signup successful", user });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


const login = async (req, res) => {
    const email = req.body.email?.toLowerCase().trim();
    const password = req.body.password?.trim();

    try {
        // Check empty fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Compare password (plain text for now)
        if (user.password !== password) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        // Success
        res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { signup, login };
