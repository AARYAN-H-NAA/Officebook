const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const jwtKey = "MY_SECRET_KEY";

const authController = {

  //Get Register Page
  getRegister :async (req, res, next) =>{
    res.render('authRegister');
  },

  //Post Register data
  postRegister :async (req, res)=>{
    const { username, email, mobile, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email Already Exist" });
      }
      // hashing password
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        username: username,
        email: email,
        mobile: mobile,
        password: hashedPassword,
      });
      res.redirect('/auth/login');
    } catch (error) {
      console.error(`We got an error in register block: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  // Get Login User page 
  getLoginPage:async (req, res, next) =>{
    res.render('authLogin');
},



  postLogin: async (req, res)=>{
    const { email, password } = req.body;
    console.table([email, password])
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const matchedPassword = await bcrypt.compare(password, existingUser.password);
      console.log(matchedPassword)
      if (!matchedPassword) {
        return res.status(400).json({ message: "Incorrect Password" });
      }
      // Generate JWT token
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, jwtKey, { expiresIn: '1h' });
      // Redirect to the dashboard or any other desired route
      if (existingUser.role == "user") {
        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/tasks/todo');
      } else if (existingUser.role == "admin") {
        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect("/admin/tasks")
      } else {
        res.send("User Role Not defined")
      }
    } catch (error) {
      console.error(`Error in login block: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  },


  
  postLogout :async(req, res) =>{
    res.clearCookie('token', function (err) {
      if (err) {
        console.error('Error clearing cookie:', err);
        // Handle the error
        // For example, you can send an error response to the client
        res.status(500).send('Error clearing cookie');
      } else {
        // Cookie cleared successfully
        // Proceed with other operations or send a success response
        console.log('Cookie cleared successfully');
      }
    });
    res.redirect('/')
  }
};

module.exports = authController;

