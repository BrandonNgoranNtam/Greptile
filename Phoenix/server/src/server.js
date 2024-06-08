// server/server.js

const express = require('express');
const routes = require('./routes');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;


// Use the CORS middleware
app.use(cors({
  origin: 'http://localhost:3001', // Change this to your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'mode'],
}));

app.use(express.json());
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send('Unauthenticated!');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
