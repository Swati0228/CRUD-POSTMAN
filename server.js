const express = require('express');
app.use(express.json());
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
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching blogs");
  }
});

app.put('/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author
      },
      { new: true } // returns updated document
    );

    if (!updatedBlog) {
      return res.status(404).send("Blog not found");
    }

    res.json(updatedBlog);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating blog");
  }
});

app.delete('/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).send("Blog not found");
    }

    res.send("Blog deleted successfully");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting blog");
  }
});
  