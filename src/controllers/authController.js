const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtKey = "MY_SECRET_KEY";

const authController = {
    // Controller method for user registration
    async register(req, res) {
        const { username, email, mobile, password } = req.body;
        try {
            // Check if user with given email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email Already Exist" });
            }
            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create new user
            const result = await User.create({
                username: username,
                email: email,
                mobile: mobile,
                password: hashedPassword,
            });
            // Generate JWT token for the new user
            const token = await jwt.sign({ email: result.email, id: result._id , role: result.role}, jwtKey , {expiresIn: '1h'});
            // Set token as a cookie and redirect to login page
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/auth/login');
        } catch (error) {
            console.error(`We got an error in register block: ${error}`);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Controller method for user login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Find user with given email
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }
            // Compare passwords
            const matchedPassword = await bcrypt.compare(password , existingUser.password );
            if (!matchedPassword) {
                return res.status(400).json({ message: "Incorrect Password" });
            }
            // Generate JWT token for the user
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id , role:existingUser.role}, jwtKey , {expiresIn: '1h'});
            // Redirect based on user role
            if(existingUser.role == "user") {
                res.cookie('token', token, { httpOnly: true });
                res.redirect('/tasks/todo');
            } else if (existingUser.role == "admin") {
                res.cookie('token', token, { httpOnly: true });
                res.redirect("/admin/tasks")
            } else {
                res.send("User Role Not defined");
            }
        } catch (error) {
            console.error(`Error in login block: ${error}`);
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    // Controller method for user logout
    async logout(req, res) {
        // Clear token cookie
        res.clearCookie('token', function(err) {
            if (err) {
                console.error('Error clearing cookie:', err);
                res.status(500).send('Error clearing cookie');
            } else {
                console.log('Cookie cleared successfully');
            }
        });
        // Redirect to home page
        res.redirect('/');
    }
};

module.exports = authController;
