const express = require('express');
const app = express();
const port = 8080;

const connectDB = require('./config/db');
const Blog = require('./models/Blog');

// ✅ Connect database
connectDB();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.get('/add', async (req, res) => {
  try {
    const blog = new Blog({
      title: "My First Blog",
      author: "Swati"
    });

    await blog.save();
    res.send("Blog saved");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});   