import express from "express";


//set up a router which we can pass in the server.js file
const router = express.Router();


//users API route
//post routes for user log in end point
// End point: /api/tasks
// HTTP Method: POST
// Description: Create a new logging in user 
router.post("/login", (req, res) => {
  console.log("Logging in user...");
  const body = req.body;
  res.status(200).json({ message: "User logged in successfully", user: body });
  // const { email, password } = req.body;
  // Handle user login logic here
  // res.json({ message: "User logged in successfully", user: { email } });
});

router.post("/signup",async (req, res) => {
  console.log("Signing up user...");
  const body = req.body;
  res.status(200).json({ message: "User signed up successfully", user: body });
  // const { email, password } = req.body;
  // Handle user signup logic here
  // res.status(201).json({ message: "User signed up successfully", user: { email } });
}
)
export default router;
// module.exports = router;