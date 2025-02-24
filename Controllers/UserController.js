const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            name: user.name,
            email: user.email,
            password: user.password,  // Corrected to 'password' (not 'hashedPassword')
            _id: user._id
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};


exports.getProfile = async (req, res) => {
    try {
        // Selecting name, email, and password fields
        const user = await User.findById(req.userId).select("name email password");
        
        // Checking if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
};
