const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router object
const Blog = require('../models/blog'); // Import the Blog model

// GET endpoint to retrieve all blogs, sorted by date in descending order
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }); // Fetch all blogs from the database, sorted by date (newest first)
    res.json(blogs); // Send the blogs as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, send a 500 status and error message
  }
});

// POST endpoint to create a new blog
router.post('/blogs', async (req, res) => {
  // Create a new blog instance with data from the request body
  const blog = new Blog({
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    content: req.body.content
  });

  try {
    const newBlog = await blog.save(); // Save the new blog to the database
    res.status(201).json(newBlog); // Send the created blog as a JSON response with a 201 status
  } catch (error) {
    res.status(400).json({ message: error.message }); // If an error occurs, send a 400 status and error message
  }
});

// PUT endpoint to update an existing blog by ID
router.put('/blogs/:id', async (req, res) => {
  try {
    // Find the blog by ID and update it with data from the request body, returning the updated blog
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog); // Send the updated blog as a JSON response
  } catch (error) {
    res.status(400).json({ message: error.message }); // If an error occurs, send a 400 status and error message
  }
});

// DELETE endpoint to delete an existing blog by ID
router.delete('/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id); // Find the blog by ID and delete it
    res.json({ message: 'Blog deleted' }); // Send a success message as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // If an error occurs, send a 500 status and error message
  }
});

module.exports = router; // Export the router to be used in other parts of the application
