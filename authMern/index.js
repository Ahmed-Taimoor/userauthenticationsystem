require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
//Middleware

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
//DB Connection
connection();
const port = process.env.PORT || 8080;
app.listen(port, () => {

  console.log(`Listening on ${port}`);

});

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------