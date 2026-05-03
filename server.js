const express = require('express');
const app = express();
const port = 8080;

const connectDB = require('./config/db');

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