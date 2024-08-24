const express = require('express');
const cors = require('cors');
const path = require('path');
const database=require("./database/database")
const app = express();
const PORT = 4000;


const allowedOrigin = 'http://localhost:3000';

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/api/v1/', require('./routes/HabitRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
