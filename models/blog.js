const mongoose = require('mongoose');

// Define a schema for the blog using Mongoose
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true }, // The title of the blog, which is a required string
  imgUrl: { type: String, required: true }, // The URL of the image associated with the blog, which is a required string
  content: { type: String, required: true }, // The content of the blog, which is a required string
  date: { type: Date, default: Date.now } // The date the blog was created, defaulting to the current date and time
});

// Export the model based on the schema
module.exports = mongoose.model('Blog', blogSchema);

