import express from "express";
import { MongoKerberosError } from "mongodb";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";
// import cors from "cors";
// import 'dotenv/config'; // Automatically loads environment variables from .env file
// require("dotenv").config();

// const userRoutes = require("./routes/userRoute");

const PORT = process.env.PORT || 6000;

const app = express();

// Middleware
//to get request parameters 
app.use(express.json());

//to get the body parameters 
app.use(express.urlencoded({ extended: true }));

//middleware for grabbing details of each request made-
app.use((req, res, next) => {
  console.log ("Request is made");
  console.log ("Host name - " + req.hostname);
  console.log ("Request path - " + req.path);
  console.log ("Request method - " + req.method);
  next();  //move on to the next middleware or route handler
});

app.use("/api/user", userRoutes);

// creating routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/api", (req, res) => {
  res.json({ message: "Hello from the API!" });
});


app.get("/about", (req, res) => {
  res.send("About Us");
});

app.get("/contact", (req, res) => {
  res.send("Contact Us");
});



// End point: /api/tasks
// HTTP Method: POST
// Description: Create a new task
// Request:
let tasks = [];

app.post('/api/tasks', (req, res) => {
  const task = req.body.task;
  console.log(task);
  // tasks.push({id: tasks.length + 1, task});
  // res.status(201).json({ message: "Task created successfully", tasks });
});

// End point: /api/tasks
// HTTP Method: GET
// Description: Get all tasks
// Request:
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// End point: /api/tasks/:id
// HTTP Method: PUT
// Description: Update an existing task
// Request:
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = req.body.task;
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex !== -1) {
    tasks[taskIndex].task = task;
    res.status(200).json({ message: "Task updated successfully", tasks });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Endpoint: /api/tasks/:id
// HTTP Method: DELETE
// Description: Delete a task
// Request:
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).json({ message: "Task deleted successfully", tasks });
});

mongoose
  .connect("mongodb+srv://pessangobong:Sophie%407@cluster0.mrqt37p.mongodb.net/")
  .then(() => {
    console.log("MongoDB database connected!");


    //once connected, start your express server on port 6000
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB database:" + error);
  });


