const express = require('express'); // Import the Express framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const cors = require('cors'); // Import CORS to handle cross-origin requests
const app = express(); // Create an Express application
const path = require('path'); // Import path to handle file and directory paths
require('dotenv').config(); // Load environment variables from .env file into process.env

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true // Use the new server discovery and monitoring engine
});

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to enable CORS
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use the blog routes
const blogRouter = require('./routes/blogs');
app.use('/api', blogRouter);

// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server on the specified port (default to 3000 if not specified)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
