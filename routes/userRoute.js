import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";


//set up a router which we can pass in the server.js file
const router = express.Router();

//users API route
//post routes for user log in end point
// End point: /api/tasks
// HTTP Method: POST
// Description: Create a new logging in user 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "User logged in successfully", user: { email } });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // const { email, password } = req.body;
  // Handle user login logic here
  // res.json({ message: "User logged in successfully", user: { email } });
});


router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Validate user input
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check if username exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully", user: newUser });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  // const { email, password } = req.body;
  // Handle user signup logic here
  // res.status(201).json({ message: "User signed up successfully", user: { email } });
}
)
export default router;
// module.exports = router;